/**
 * Replaces the first occurrence of `search` (a string, or a RegExp for text
 * that legitimately varies, like version numbers) with `replace`, throwing a
 * descriptive error if it isn't found — file edits should fail loudly rather
 * than silently no-op when the source file has drifted from what this script
 * expects. `replace` is inserted literally (no `$1`-style expansion).
 */
export function replaceOnce(content, search, replace, label) {
  let index;
  let length;
  if (search instanceof RegExp) {
    const match = search.exec(content);
    index = match ? match.index : -1;
    length = match ? match[0].length : 0;
  } else {
    index = content.indexOf(search);
    length = search.length;
  }
  if (index === -1) {
    throw new Error(`Could not find expected text for "${label}". The source file may have changed.`);
  }
  return content.slice(0, index) + replace + content.slice(index + length);
}

export function removeOnce(content, search, label) {
  return replaceOnce(content, search, "", label);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function indentOf(line) {
  return line.length - line.trimStart().length;
}

/**
 * Removes a block of lines starting at `startIndex` and running until the
 * next non-blank line indented at or below `indent` (a sibling job/step or a
 * parent key). Blank lines trailing the block are removed with it.
 */
function removeIndentedBlock(lines, startIndex, indent) {
  let end = startIndex + 1;
  while (end < lines.length) {
    const line = lines[end];
    if (line.trim() !== "" && indentOf(line) <= indent) break;
    end++;
  }
  lines.splice(startIndex, end - startIndex);
  return lines;
}

/**
 * Removes a GitHub Actions job (`  <jobId>:` under `jobs:`) by its key,
 * regardless of its contents — so action version bumps, added steps etc.
 * inside the job can't break the match.
 */
export function removeYamlJob(content, jobId, label) {
  const lines = content.split("\n");
  const pattern = new RegExp(`^  ${escapeRegExp(jobId)}:\\s*$`);
  const start = lines.findIndex((line) => pattern.test(line));
  if (start === -1) {
    throw new Error(`Could not find job "${jobId}" for "${label}". The workflow file may have changed.`);
  }
  return removeIndentedBlock(lines, start, 2).join("\n");
}

/** Escapes a value for safe insertion into a double-quoted JS/TS string literal. */
export function jsStringLiteral(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** Escapes a value for safe insertion into HTML text content/attributes. */
export function htmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
