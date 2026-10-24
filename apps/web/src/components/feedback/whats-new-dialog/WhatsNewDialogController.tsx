import type { ReactElement } from "react";
import { useWhatsNewDialogController } from "./UseWhatsNewDialogController";
import { WhatsNewDialog } from "./WhatsNewDialog";

export function WhatsNewDialogController(): ReactElement {
  const props = useWhatsNewDialogController();
  return <WhatsNewDialog {...props} />;
}
