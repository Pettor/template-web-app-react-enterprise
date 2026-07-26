/**
 * Replaces the first occurrence of `search` with `replace`, throwing a
 * descriptive error if it isn't found — file edits should fail loudly rather
 * than silently no-op when the source file has drifted from what this script
 * expects.
 */
export function replaceOnce(content, search, replace, label) {
  const index = content.indexOf(search);
  if (index === -1) {
    throw new Error(`Could not find expected text for "${label}". The source file may have changed.`);
  }
  return content.slice(0, index) + replace + content.slice(index + search.length);
}

export function removeOnce(content, search, label) {
  return replaceOnce(content, search, "", label);
}

/** Escapes a value for safe insertion into a double-quoted JS/TS string literal. */
export function jsStringLiteral(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/** Escapes a value for safe insertion into HTML text content/attributes. */
export function htmlEscape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
