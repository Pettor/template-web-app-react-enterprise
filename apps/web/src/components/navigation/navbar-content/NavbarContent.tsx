import { useState, type ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar, Button, Link, Modal, Separator, Surface, Tabs } from "@heroui/react";
import { GithubIcon, LinkedInIcon, Navbar } from "@package/ui";
import { NAV_MENU_ITEMS } from "./NavMenuItems";
import type { AccountPanelProps } from "~/components/feedback/account-panel/AccountPanel";
import { AccountPanel } from "~/components/feedback/account-panel/AccountPanel";
import type { AppSocialLinks } from "~/core/social-links/AppSocialLinks";

export interface NavbarContentProps {
  account: AccountPanelProps;
  socialLinks: AppSocialLinks;
}

export function NavbarContent({ account, socialLinks }: NavbarContentProps): ReactElement {
  const { onGithubClick, onLinkedInClick } = socialLinks;
  const { name } = account;
  const [activeTab, setActiveTab] = useState<string>("features");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  function getAvatarFallback(displayName: string): string {
    const names = displayName.split(" ");
    if (!names || !names[0]) {
      return "";
    }

    if (names.length === 1 || !names[1]) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }

  function toggleExpanded(id: string): void {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const featuresItem = NAV_MENU_ITEMS.find((item) => item.id === "features");

  const centerElement = (
    <div className="relative">
      <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Navigation">
            {NAV_MENU_ITEMS.map((item, index) => (
              <Tabs.Tab key={item.id} id={item.id}>
                {index > 0 && <Tabs.Separator />}
                <span className="flex items-center gap-1">
                  {item.icon}
                  {item.name}
                  {item.children && <ChevronDownIcon className="h-3 w-3" />}
                </span>
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
      {activeTab === "features" && featuresItem?.children && (
        <div className="bg-background absolute top-full left-0 z-10 mt-2 flex flex-col gap-1 rounded-lg border p-2 shadow-lg">
          {featuresItem.children.map((child) => (
            <Link
              key={child.id}
              href={child.href}
              className="hover:bg-default-100 flex items-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              {child.icon}
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const endElement = (
    <div className="flex gap-1">
      <div className="hidden sm:block">
        <Modal>
          <Modal.Trigger data-testid="home-page__menu-button">
            <Avatar variant="soft" className="cursor-pointer">
              <Avatar.Fallback>{getAvatarFallback(name)}</Avatar.Fallback>
            </Avatar>
          </Modal.Trigger>
          <Modal.Backdrop variant="blur">
            <Modal.Container>
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.CloseTrigger />
                </Modal.Header>
                <Modal.Body className="py-4">
                  <Surface variant="default">
                    <AccountPanel {...account} />
                  </Surface>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onGithubClick}>
        <GithubIcon />
      </Button>
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onLinkedInClick}>
        <LinkedInIcon />
      </Button>
    </div>
  );

  const menuElement = (
    <div className="flex h-full flex-col">
      <nav className="flex-1 px-4 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_MENU_ITEMS.map((item) => (
            <li key={item.id}>
              {item.children ? (
                <>
                  <button
                    className="hover:bg-default-100 flex w-full items-center gap-3 rounded-lg px-3 py-2.5"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {item.icon}
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedItems.has(item.id) && (
                    <ul className="ml-8 flex flex-col gap-1 py-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className="hover:bg-default-100 flex items-center gap-2 rounded-lg px-3 py-2"
                          >
                            {child.icon}
                            <span className="text-sm">{child.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={item.href} className="hover:bg-default-100 flex items-center gap-3 rounded-lg px-3 py-2.5">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <Separator />
      <div className="px-4 py-4">
        <AccountPanel {...account} />
      </div>
    </div>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuElement} endElement={endElement} />;
}
