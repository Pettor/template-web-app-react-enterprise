import { useState } from "react";

interface CopyToClipboardResult {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
}

export function useCopyToClipboard(): CopyToClipboardResult {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  async function copy(text: string): Promise<boolean> {
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch {
      setCopiedText(null);
      return false;
    }
  }

  return { copiedText, copy };
}
