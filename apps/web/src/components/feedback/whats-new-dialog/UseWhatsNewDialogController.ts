import { useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import type { WhatsNewDialogProps, WhatsNewItem, WhatsNewRelease } from "./WhatsNewDialog";
import { useAppInfo } from "~/core/config/UseAppInfo";
import type { ReleaseNoteItem } from "~/core/whats-new/ReleaseNotes";
import { useWhatsNew } from "~/core/whats-new/UseWhatsNew";

export function useWhatsNewDialogController(): WhatsNewDialogProps {
  const intl = useIntl();
  const { appName } = useAppInfo();
  const { isOpen, releases, close } = useWhatsNew();

  const formatted = useMemo((): WhatsNewRelease[] => {
    function formatItem({ emoji, title, description }: ReleaseNoteItem): WhatsNewItem {
      return { emoji, title: intl.formatMessage(title), description: intl.formatMessage(description) };
    }
    return releases.map((release) => ({
      version: release.version,
      tagline: intl.formatMessage(release.tagline),
      highlights: release.highlights.map(formatItem),
      fixes: release.fixes.map(formatItem),
    }));
  }, [intl, releases]);

  // Keep the notes on screen while the dialog animates out.
  const lastShown = useRef<WhatsNewRelease[]>([]);
  if (formatted.length > 0) {
    lastShown.current = formatted;
  }

  return { isOpen, appName, releases: isOpen ? formatted : lastShown.current, onClose: close };
}
