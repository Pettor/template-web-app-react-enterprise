import { replaceOnce } from "./textEdit.mjs";

const RELEASE_NOTES_PATH = "apps/web/src/core/whats-new/ReleaseNotes.ts";
const RELEASE_NOTES_EXPORT = "export const RELEASE_NOTES: ReleaseNote[] = [";

/**
 * Empties the template's "What's new" release notes: they describe the
 * template's own history, not the new project's. The types and the doc
 * comment above `RELEASE_NOTES` are kept so the first real entry has
 * something to follow.
 */
export function resetReleaseNotes(ws) {
  ws.edit(RELEASE_NOTES_PATH, (content) => {
    content = replaceOnce(
      content,
      'import { defineMessages, type MessageDescriptor } from "react-intl";',
      'import type { MessageDescriptor } from "react-intl";',
      "ReleaseNotes react-intl import"
    );

    const firstNotes = content.indexOf("\nconst v");
    const exportIndex = content.indexOf(RELEASE_NOTES_EXPORT);
    const docIndex = content.lastIndexOf("/**", exportIndex);
    if (firstNotes === -1 || exportIndex === -1 || docIndex < firstNotes) {
      throw new Error('Could not find expected text for "ReleaseNotes entries". The source file may have changed.');
    }

    return `${content.slice(0, firstNotes + 1)}${content.slice(docIndex, exportIndex)}${RELEASE_NOTES_EXPORT}];\n`;
  });
}
