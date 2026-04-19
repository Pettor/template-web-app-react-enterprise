import type { ReactElement } from "react";
import { SettingsModal } from "./SettingsModal";
import { useSettingsModalController } from "./UseSettingsModalController";

export function SettingsModalController(): ReactElement {
  const props = useSettingsModalController();
  return <SettingsModal {...props} />;
}
