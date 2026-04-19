import { useState, useEffect, type ReactElement } from "react";
import { InformationCircleIcon, SwatchIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Modal, Separator, Tabs } from "@heroui/react";
import { useIntl } from "react-intl";
import type { SettingsAboutSectionProps } from "./SettingsAboutSection";
import { SettingsAboutSection } from "./SettingsAboutSection";
import type { SettingsAccountSectionProps } from "./SettingsAccountSection";
import { SettingsAccountSection } from "./SettingsAccountSection";
import type { SettingsAppearanceSectionProps } from "./SettingsAppearanceSection";
import { SettingsAppearanceSection } from "./SettingsAppearanceSection";
import type { SettingsSection } from "~/core/settings/SettingsSection";

export interface SettingsModalProps {
  isOpen: boolean;
  sections: SettingsSection[];
  initialSection?: SettingsSection;
  onClose: () => void;
  account?: SettingsAccountSectionProps;
  appearance: SettingsAppearanceSectionProps;
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
  appearance,
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
          description: "SettingsModal: tab - account",
          defaultMessage: "Account",
          id: "itKwWQ",
        });
      case "appearance":
        return intl.formatMessage({
          description: "SettingsModal: tab - appearance",
          defaultMessage: "Appearance",
          id: "miFRsV",
        });
      case "about":
        return intl.formatMessage({
          description: "SettingsModal: tab - about",
          defaultMessage: "About",
          id: "pPj4qN",
        });
    }
  }

  function renderSection(section: SettingsSection): ReactElement {
    switch (section) {
      case "account":
        return account ? <SettingsAccountSection {...account} /> : <></>;
      case "appearance":
        return <SettingsAppearanceSection {...appearance} />;
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
              description: "SettingsModal: aria-label - dialog",
              defaultMessage: "Settings",
              id: "Br9aNm",
            })}
          >
            <Modal.Header>
              <Modal.Heading>
                {intl.formatMessage({
                  description: "SettingsModal: heading - title",
                  defaultMessage: "Settings",
                  id: "A5kccO",
                })}
              </Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>
            <Modal.Body className="p-0">
              {/* Desktop: vertical tabs with content pane */}
              <div className="hidden sm:flex sm:min-h-[400px] sm:flex-row">
                <Tabs
                  variant="secondary"
                  orientation="vertical"
                  selectedKey={activeSection}
                  onSelectionChange={(key) => setActiveSection(key as SettingsSection)}
                  className="flex-1"
                >
                  <Tabs.ListContainer className="border-r">
                    <Tabs.List
                      aria-label={intl.formatMessage({
                        description: "SettingsModal: aria-label - settings navigation",
                        defaultMessage: "Settings navigation",
                        id: "QJ8Qdm",
                      })}
                    >
                      {sections.map((section, index) => (
                        <Tabs.Tab className="justify-start" key={section} id={section}>
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
                  {sections.map((section) => (
                    <Tabs.Panel key={section} id={section} className="flex-1 px-6">
                      {renderSection(section)}
                    </Tabs.Panel>
                  ))}
                </Tabs>
              </div>

              {/* Mobile: all sections stacked vertically */}
              <div className="flex flex-col gap-6 px-4 pb-4 sm:hidden">
                {sections.map((section, index) => (
                  <div key={section}>
                    {index > 0 && <Separator className="mb-6" />}
                    {renderSection(section)}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
