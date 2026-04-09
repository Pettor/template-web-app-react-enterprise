import { useState, useEffect, type ReactElement } from "react";
import { InformationCircleIcon, SwatchIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { ListBox, ListBoxItem, Modal, Separator } from "@heroui/react";
import { useIntl } from "react-intl";
import type { SettingsAboutSectionProps } from "./SettingsAboutSection";
import { SettingsAboutSection } from "./SettingsAboutSection";
import type { SettingsAccountSectionProps } from "./SettingsAccountSection";
import { SettingsAccountSection } from "./SettingsAccountSection";
import { SettingsAppearanceSection } from "./SettingsAppearanceSection";
import type { SettingsSection } from "~/core/settings/SettingsSection";

export interface SettingsModalProps {
  isOpen: boolean;
  sections: SettingsSection[];
  initialSection?: SettingsSection;
  onClose: () => void;
  account?: SettingsAccountSectionProps;
  aboutDetails: SettingsAboutSectionProps;
}

const SECTION_ICONS: Record<SettingsSection, ReactElement> = {
  account: <UserCircleIcon className="h-5 w-5" />,
  appearance: <SwatchIcon className="h-5 w-5" />,
  about: <InformationCircleIcon className="h-5 w-5" />,
};

export function SettingsModal({
  isOpen,
  sections,
  initialSection,
  onClose,
  account,
  aboutDetails,
}: SettingsModalProps): ReactElement {
  const intl = useIntl();
  const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection ?? sections[0] ?? "appearance");

  useEffect(() => {
    if (isOpen && initialSection) {
      setActiveSection(initialSection);
    }
  }, [isOpen, initialSection]);

  function getSectionLabel(section: SettingsSection): string {
    switch (section) {
      case "account":
        return intl.formatMessage({
          description: "SettingsModal - Account tab",
          defaultMessage: "Account",
          id: "nO3mXm",
        });
      case "appearance":
        return intl.formatMessage({
          description: "SettingsModal - Appearance tab",
          defaultMessage: "Appearance",
          id: "cHdANY",
        });
      case "about":
        return intl.formatMessage({
          description: "SettingsModal - About tab",
          defaultMessage: "About",
          id: "i5j6bp",
        });
    }
  }

  function renderContent(): ReactElement {
    switch (activeSection) {
      case "account":
        return account ? <SettingsAccountSection {...account} /> : <></>;
      case "appearance":
        return <SettingsAppearanceSection />;
      case "about":
        return <SettingsAboutSection {...aboutDetails} />;
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="lg">
          <Modal.Dialog
            aria-label={intl.formatMessage({
              description: "SettingsModal - Dialog label",
              defaultMessage: "Settings",
              id: "483FyL",
            })}
          >
            <Modal.Header>
              <Modal.Heading>
                {intl.formatMessage({
                  description: "SettingsModal - Title",
                  defaultMessage: "Settings",
                  id: "oKv7MA",
                })}
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="flex flex-col sm:min-h-[400px] sm:flex-row">
                <nav className="border-b p-2 sm:w-48 sm:shrink-0 sm:border-r sm:border-b-0 sm:p-4">
                  <ListBox
                    aria-label={intl.formatMessage({
                      description: "SettingsModal - Navigation label",
                      defaultMessage: "Settings navigation",
                      id: "c51bvr",
                    })}
                    selectedKeys={[activeSection]}
                    selectionMode="single"
                    onSelectionChange={(keys) => {
                      const selected = [...keys][0] as SettingsSection | undefined;
                      if (selected) {
                        setActiveSection(selected);
                      }
                    }}
                  >
                    {sections.map((section) => (
                      <ListBoxItem key={section} id={section} textValue={getSectionLabel(section)}>
                        <div className="flex items-center gap-2">
                          {SECTION_ICONS[section]}
                          <span>{getSectionLabel(section)}</span>
                        </div>
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </nav>
                <Separator className="sm:hidden" />
                <div className="flex-1 p-4 sm:p-6">{renderContent()}</div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
