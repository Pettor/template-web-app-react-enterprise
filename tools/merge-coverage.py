#!/usr/bin/env python3
"""
Merge multiple Cobertura XML coverage reports into one, taking the maximum
hit count per line across all inputs.

Usage:
  python3 tools/merge-coverage.py <output.xml> <input1.xml> [input2.xml ...]

This is used to combine coverage from different test runners (Vitest V8 for
unit/storybook tests, Istanbul for E2E tests) without the format incompatibility
issues that arise when merging their raw JSON formats via nyc merge.

Strategy: "best coverage wins"
  For each source file, the line hit count is the MAX across all input reports.
  This means a line tested by any test suite is counted as covered.
"""

import os
import sys
import xml.etree.ElementTree as ET
from collections import defaultdict


def normalize_filename(source_dir: str, filename: str, repo_root: str) -> str:
    """Convert a cobertura class filename to a repo-root-relative path."""
    abs_path = os.path.normpath(os.path.join(source_dir, filename))
    rel = os.path.relpath(abs_path, repo_root)
    # Normalize path separators to forward slashes
    return rel.replace("\\", "/")


def parse_cobertura(xml_file: str, repo_root: str) -> dict:
    """
    Parse a cobertura XML file and return per-file coverage data.

    Returns:
      dict mapping normalized filename -> {
        "lines": {line_number: hit_count},
        "branches": {branch_key: hit_count},
      }
    """
    try:
        tree = ET.parse(xml_file)
    except FileNotFoundError:
        print(f"[merge-coverage] Skipping missing file: {xml_file}", file=sys.stderr)
        return {}
    except ET.ParseError as e:
        print(f"[merge-coverage] Skipping unparseable file {xml_file}: {e}", file=sys.stderr)
        return {}

    root = tree.getroot()

    source_el = root.find(".//source")
    source_dir = source_el.text.strip() if source_el is not None and source_el.text else repo_root

    result: dict = {}

    for cls in root.iter("class"):
        filename = cls.get("filename", "")
        if not filename:
            continue

        norm = normalize_filename(source_dir, filename, repo_root)

        # Skip files outside the repo (e.g. node_modules after normalization)
        if norm.startswith(".."):
            continue

        if norm not in result:
            result[norm] = {"lines": {}, "branches": {}}

        for line_el in cls.iter("line"):
            line_num = int(line_el.get("number", 0))
            hits = int(line_el.get("hits", 0))
            current = result[norm]["lines"].get(line_num, 0)
            result[norm]["lines"][line_num] = max(current, hits)

            # Track branch coverage if present
            condition = line_el.get("condition-coverage", "")
            if condition:
                # e.g. "75% (3/4)" → extract covered/total
                try:
                    fraction = condition.split("(")[1].rstrip(")")
                    covered_str, total_str = fraction.split("/")
                    branch_key = line_num
                    existing = result[norm]["branches"].get(branch_key, (0, 0))
                    b_covered = max(existing[0], int(covered_str))
                    b_total = max(existing[1], int(total_str))
                    result[norm]["branches"][branch_key] = (b_covered, b_total)
                except (IndexError, ValueError):
                    pass

    return result


def merge_all(input_files: list, repo_root: str) -> dict:
    """Merge all input files into one coverage dict (max hits per line)."""
    combined: dict = {}

    for xml_file in input_files:
        file_data = parse_cobertura(xml_file, repo_root)
        for norm_path, data in file_data.items():
            if norm_path not in combined:
                combined[norm_path] = {"lines": {}, "branches": {}}

            for line_num, hits in data["lines"].items():
                current = combined[norm_path]["lines"].get(line_num, 0)
                combined[norm_path]["lines"][line_num] = max(current, hits)

            for branch_key, (covered, total) in data["branches"].items():
                existing = combined[norm_path]["branches"].get(branch_key, (0, 0))
                b_covered = max(existing[0], covered)
                b_total = max(existing[1], total)
                combined[norm_path]["branches"][branch_key] = (b_covered, b_total)

    return combined


def generate_cobertura(combined: dict) -> ET.Element:
    """Generate a combined Cobertura XML ElementTree from merged coverage data."""
    # Group files by their directory (= package)
    packages: dict = defaultdict(dict)
    for filepath in sorted(combined.keys()):
        dir_path = os.path.dirname(filepath)
        packages[dir_path][filepath] = combined[filepath]

    total_lines_valid = 0
    total_lines_covered = 0
    total_branches_valid = 0
    total_branches_covered = 0

    root_el = ET.Element("coverage")
    sources_el = ET.SubElement(root_el, "sources")
    ET.SubElement(sources_el, "source").text = "."
    packages_el = ET.SubElement(root_el, "packages")

    for dir_path in sorted(packages.keys()):
        pkg_name = dir_path.replace("/", ".").replace("\\", ".")

        pkg_lines_valid = 0
        pkg_lines_covered = 0
        pkg_branches_valid = 0
        pkg_branches_covered = 0

        pkg_el = ET.SubElement(packages_el, "package", name=pkg_name)
        classes_el = ET.SubElement(pkg_el, "classes")

        for filepath in sorted(packages[dir_path].keys()):
            data = combined[filepath]
            lines_data = data.get("lines", {})
            branches_data = data.get("branches", {})

            file_lines_valid = len(lines_data)
            file_lines_covered = sum(1 for h in lines_data.values() if h > 0)
            file_branches_valid = sum(total for _, total in branches_data.values())
            file_branches_covered = sum(covered for covered, _ in branches_data.values())

            line_rate = file_lines_covered / file_lines_valid if file_lines_valid > 0 else 1.0
            branch_rate = (
                file_branches_covered / file_branches_valid if file_branches_valid > 0 else 1.0
            )

            class_name = os.path.basename(filepath)
            cls_el = ET.SubElement(
                classes_el,
                "class",
                name=class_name,
                filename=filepath,
                **{"line-rate": f"{line_rate:.4f}", "branch-rate": f"{branch_rate:.4f}", "complexity": "0"},
            )
            ET.SubElement(cls_el, "methods")
            lines_el = ET.SubElement(cls_el, "lines")

            for line_num in sorted(lines_data.keys()):
                hits = lines_data[line_num]
                branch_info = branches_data.get(line_num)
                line_attrs: dict = {"number": str(line_num), "hits": str(hits)}
                if branch_info:
                    covered, total = branch_info
                    pct = int(100 * covered / total) if total > 0 else 100
                    line_attrs["branch"] = "true"
                    line_attrs["condition-coverage"] = f"{pct}% ({covered}/{total})"
                else:
                    line_attrs["branch"] = "false"
                ET.SubElement(lines_el, "line", **line_attrs)

            pkg_lines_valid += file_lines_valid
            pkg_lines_covered += file_lines_covered
            pkg_branches_valid += file_branches_valid
            pkg_branches_covered += file_branches_covered

        total_lines_valid += pkg_lines_valid
        total_lines_covered += pkg_lines_covered
        total_branches_valid += pkg_branches_valid
        total_branches_covered += pkg_branches_covered

        pkg_line_rate = pkg_lines_covered / pkg_lines_valid if pkg_lines_valid > 0 else 1.0
        pkg_branch_rate = (
            pkg_branches_covered / pkg_branches_valid if pkg_branches_valid > 0 else 1.0
        )
        pkg_el.set("line-rate", f"{pkg_line_rate:.4f}")
        pkg_el.set("branch-rate", f"{pkg_branch_rate:.4f}")
        pkg_el.set("complexity", "0")

    total_line_rate = total_lines_covered / total_lines_valid if total_lines_valid > 0 else 1.0
    total_branch_rate = (
        total_branches_covered / total_branches_valid if total_branches_valid > 0 else 1.0
    )
    root_el.set("lines-valid", str(total_lines_valid))
    root_el.set("lines-covered", str(total_lines_covered))
    root_el.set("line-rate", f"{total_line_rate:.4f}")
    root_el.set("branches-valid", str(total_branches_valid))
    root_el.set("branches-covered", str(total_branches_covered))
    root_el.set("branch-rate", f"{total_branch_rate:.4f}")
    root_el.set("timestamp", "0")
    root_el.set("complexity", "0")
    root_el.set("version", "0.1")

    return root_el


def indent(elem: ET.Element, level: int = 0) -> None:
    """Add pretty-print indentation to an ElementTree in-place."""
    indent_str = "\n" + "  " * level
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = indent_str + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = indent_str
        for child in elem:
            indent(child, level + 1)
        if not child.tail or not child.tail.strip():  # type: ignore[reportPossiblyUnbound]
            child.tail = indent_str
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = indent_str


def main() -> None:
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <output.xml> <input1.xml> [input2.xml ...]", file=sys.stderr)
        sys.exit(1)

    output_file = sys.argv[1]
    input_files = sys.argv[2:]
    repo_root = os.getcwd()

    combined = merge_all(input_files, repo_root)

    if not combined:
        print("[merge-coverage] Warning: no coverage data found in input files.", file=sys.stderr)

    root_el = generate_cobertura(combined)
    indent(root_el)

    tree = ET.ElementTree(root_el)
    ET.register_namespace("", "")

    out_dir = os.path.dirname(output_file)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" ?>\n')
        f.write('<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">\n')
        tree.write(f, encoding="unicode", xml_declaration=False)
        f.write("\n")

    total_lines_valid = int(root_el.get("lines-valid", "0"))
    total_lines_covered = int(root_el.get("lines-covered", "0"))
    line_rate = float(root_el.get("line-rate", "0"))
    print(
        f"[merge-coverage] {output_file}: "
        f"{total_lines_covered}/{total_lines_valid} lines covered "
        f"({line_rate * 100:.1f}%)"
    )


if __name__ == "__main__":
    main()
