import { useState, useEffect, type ReactElement } from "react";
import { InformationCircleIcon, SwatchIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Modal, Tabs } from "@heroui/react";
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
  account: <UserCircleIcon className="h-4 w-4" />,
  appearance: <SwatchIcon className="h-4 w-4" />,
  about: <InformationCircleIcon className="h-4 w-4" />,
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
                <Tabs
                  variant="secondary"
                  orientation="vertical"
                  selectedKey={activeSection}
                  onSelectionChange={(key) => setActiveSection(key as SettingsSection)}
                  className="hidden border-r sm:flex"
                >
                  <Tabs.ListContainer>
                    <Tabs.List
                      aria-label={intl.formatMessage({
                        description: "SettingsModal - Navigation label",
                        defaultMessage: "Settings navigation",
                        id: "c51bvr",
                      })}
                    >
                      {sections.map((section, index) => (
                        <Tabs.Tab key={section} id={section}>
                          {index > 0 && <Tabs.Separator />}
                          <span className="flex items-center gap-2">
                            {SECTION_ICONS[section]}
                            {getSectionLabel(section)}
                          </span>
                          <Tabs.Indicator />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                </Tabs>
                <Tabs
                  selectedKey={activeSection}
                  onSelectionChange={(key) => setActiveSection(key as SettingsSection)}
                  className="sm:hidden"
                >
                  <Tabs.ListContainer className="border-b px-2">
                    <Tabs.List
                      aria-label={intl.formatMessage({
                        description: "SettingsModal - Navigation label",
                        defaultMessage: "Settings navigation",
                        id: "c51bvr",
                      })}
                    >
                      {sections.map((section, index) => (
                        <Tabs.Tab key={section} id={section}>
                          {index > 0 && <Tabs.Separator />}
                          <span className="flex items-center gap-1">
                            {SECTION_ICONS[section]}
                            {getSectionLabel(section)}
                          </span>
                          <Tabs.Indicator />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                </Tabs>
                <div className="flex-1 px-4 sm:px-6">{renderContent()}</div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
