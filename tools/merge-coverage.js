#!/usr/bin/env node
/**
 * Merge multiple Cobertura XML coverage reports into one, taking the maximum
 * hit count per line across all inputs.
 *
 * Usage:
 *   node tools/merge-coverage.js <output.xml> <input1.xml> [input2.xml ...]
 *
 * This is used to combine coverage from different test runners (Vitest V8 for
 * unit/storybook tests, Istanbul for E2E tests) without the format incompatibility
 * issues that arise when merging their raw JSON formats via nyc merge.
 *
 * Strategy: "best coverage wins"
 *   For each source file, the line hit count is the MAX across all input reports.
 *   This means a line tested by any test suite is counted as covered.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, normalize, relative, sep } from "node:path";
import { XMLParser } from "fast-xml-parser";

function normalizeFilename(sourceDir, filename, repoRoot) {
  const absPath = normalize(join(sourceDir, filename));
  const rel = relative(repoRoot, absPath);
  return rel.split(sep).join("/");
}

function parseCobertura(xmlFile, repoRoot) {
  let xmlContent;
  try {
    xmlContent = readFileSync(xmlFile, "utf-8");
  } catch {
    console.warn(`[merge-coverage] Skipping missing file: ${xmlFile}`);
    return {};
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    isArray: (name) => ["source", "package", "class", "line", "method"].includes(name),
  });

  let parsed;
  try {
    parsed = parser.parse(xmlContent);
  } catch (e) {
    console.warn(`[merge-coverage] Skipping unparseable file ${xmlFile}: ${e.message}`);
    return {};
  }

  const coverage = parsed.coverage;
  if (!coverage) return {};

  const sources = coverage.sources?.source ?? [];
  const sourceDir = sources[0] ?? repoRoot;

  const result = {};
  const packages = coverage.packages?.package ?? [];

  for (const pkg of packages) {
    const classes = pkg.classes?.class ?? [];
    for (const cls of classes) {
      const filename = cls["@_filename"];
      if (!filename) continue;

      const norm = normalizeFilename(sourceDir, filename, repoRoot);
      if (norm.startsWith("..")) continue;

      if (!result[norm]) result[norm] = { lines: {}, branches: {} };

      const lines = cls.lines?.line ?? [];
      for (const line of lines) {
        const lineNum = parseInt(line["@_number"], 10);
        const hits = parseInt(line["@_hits"], 10);
        result[norm].lines[lineNum] = Math.max(result[norm].lines[lineNum] ?? 0, hits);

        const condition = line["@_condition-coverage"];
        if (condition) {
          try {
            const fraction = condition.split("(")[1].replace(")", "");
            const [coveredStr, totalStr] = fraction.split("/");
            const existing = result[norm].branches[lineNum] ?? [0, 0];
            result[norm].branches[lineNum] = [
              Math.max(existing[0], parseInt(coveredStr, 10)),
              Math.max(existing[1], parseInt(totalStr, 10)),
            ];
          } catch {
            // ignore malformed condition-coverage attributes
          }
        }
      }
    }
  }

  return result;
}

function mergeAll(inputFiles, repoRoot) {
  const combined = {};

  for (const xmlFile of inputFiles) {
    const fileData = parseCobertura(xmlFile, repoRoot);
    for (const [normPath, data] of Object.entries(fileData)) {
      if (!combined[normPath]) combined[normPath] = { lines: {}, branches: {} };

      for (const [lineNum, hits] of Object.entries(data.lines)) {
        combined[normPath].lines[lineNum] = Math.max(combined[normPath].lines[lineNum] ?? 0, hits);
      }

      for (const [branchKey, [covered, total]] of Object.entries(data.branches)) {
        const existing = combined[normPath].branches[branchKey] ?? [0, 0];
        combined[normPath].branches[branchKey] = [Math.max(existing[0], covered), Math.max(existing[1], total)];
      }
    }
  }

  return combined;
}

function escapeXml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function generateCobertura(combined) {
  // Group files by their directory (= cobertura package)
  const packages = {};
  for (const filepath of Object.keys(combined).sort()) {
    const dirPath = dirname(filepath);
    if (!packages[dirPath]) packages[dirPath] = {};
    packages[dirPath][filepath] = combined[filepath];
  }

  let totalLinesValid = 0;
  let totalLinesCovered = 0;
  let totalBranchesValid = 0;
  let totalBranchesCovered = 0;

  const packageBlocks = [];

  for (const dirPath of Object.keys(packages).sort()) {
    const pkgName = dirPath.replace(/[/\\]/g, ".");
    let pkgLinesValid = 0;
    let pkgLinesCovered = 0;
    let pkgBranchesValid = 0;
    let pkgBranchesCovered = 0;

    const classBlocks = [];

    for (const filepath of Object.keys(packages[dirPath]).sort()) {
      const { lines: linesData, branches: branchesData } = combined[filepath];

      const fileLinesValid = Object.keys(linesData).length;
      const fileLinesCovered = Object.values(linesData).filter((h) => h > 0).length;
      const fileBranchesValid = Object.values(branchesData).reduce((sum, [, t]) => sum + t, 0);
      const fileBranchesCovered = Object.values(branchesData).reduce((sum, [c]) => sum + c, 0);

      const lineRate = fileLinesValid > 0 ? fileLinesCovered / fileLinesValid : 1.0;
      const branchRate = fileBranchesValid > 0 ? fileBranchesCovered / fileBranchesValid : 1.0;
      const className = filepath.split("/").pop();

      const lineEls = Object.keys(linesData)
        .map(Number)
        .sort((a, b) => a - b)
        .map((lineNum) => {
          const hits = linesData[lineNum];
          const branchInfo = branchesData[lineNum];
          if (branchInfo) {
            const [covered, total] = branchInfo;
            const pct = total > 0 ? Math.round((100 * covered) / total) : 100;
            return `          <line number="${lineNum}" hits="${hits}" branch="true" condition-coverage="${pct}% (${covered}/${total})"/>`;
          }
          return `          <line number="${lineNum}" hits="${hits}" branch="false"/>`;
        });

      classBlocks.push(
        `      <class name="${escapeXml(className)}" filename="${escapeXml(filepath)}" line-rate="${lineRate.toFixed(4)}" branch-rate="${branchRate.toFixed(4)}" complexity="0">
        <methods/>
        <lines>
${lineEls.join("\n")}
        </lines>
      </class>`
      );

      pkgLinesValid += fileLinesValid;
      pkgLinesCovered += fileLinesCovered;
      pkgBranchesValid += fileBranchesValid;
      pkgBranchesCovered += fileBranchesCovered;
    }

    totalLinesValid += pkgLinesValid;
    totalLinesCovered += pkgLinesCovered;
    totalBranchesValid += pkgBranchesValid;
    totalBranchesCovered += pkgBranchesCovered;

    const pkgLineRate = pkgLinesValid > 0 ? pkgLinesCovered / pkgLinesValid : 1.0;
    const pkgBranchRate = pkgBranchesValid > 0 ? pkgBranchesCovered / pkgBranchesValid : 1.0;

    packageBlocks.push(
      `    <package name="${escapeXml(pkgName)}" line-rate="${pkgLineRate.toFixed(4)}" branch-rate="${pkgBranchRate.toFixed(4)}" complexity="0">
      <classes>
${classBlocks.join("\n")}
      </classes>
    </package>`
    );
  }

  const totalLineRate = totalLinesValid > 0 ? totalLinesCovered / totalLinesValid : 1.0;
  const totalBranchRate = totalBranchesValid > 0 ? totalBranchesCovered / totalBranchesValid : 1.0;

  const xml =
    `<?xml version="1.0" ?>\n` +
    `<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">\n` +
    `<coverage lines-valid="${totalLinesValid}" lines-covered="${totalLinesCovered}" line-rate="${totalLineRate.toFixed(4)}" branches-valid="${totalBranchesValid}" branches-covered="${totalBranchesCovered}" branch-rate="${totalBranchRate.toFixed(4)}" timestamp="0" complexity="0" version="0.1">\n` +
    `  <sources>\n    <source>.</source>\n  </sources>\n` +
    `  <packages>\n${packageBlocks.join("\n")}\n  </packages>\n` +
    `</coverage>\n`;

  return { xml, totalLinesValid, totalLinesCovered, totalLineRate };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node tools/merge-coverage.js <output.xml> <input1.xml> [input2.xml ...]");
    process.exit(1);
  }

  const [outputFile, ...inputFiles] = args;
  const repoRoot = process.cwd();

  const combined = mergeAll(inputFiles, repoRoot);

  if (Object.keys(combined).length === 0) {
    console.warn("[merge-coverage] Warning: no coverage data found in input files.");
  }

  const { xml, totalLinesValid, totalLinesCovered, totalLineRate } = generateCobertura(combined);

  const outDir = dirname(outputFile);
  if (outDir && outDir !== ".") {
    mkdirSync(outDir, { recursive: true });
  }

  writeFileSync(outputFile, xml, "utf-8");
  console.log(
    `[merge-coverage] ${outputFile}: ${totalLinesCovered}/${totalLinesValid} lines covered (${(totalLineRate * 100).toFixed(1)}%)`
  );
}

main();
