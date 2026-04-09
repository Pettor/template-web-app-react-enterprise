import { useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar, Link, Popover, Separator, Tabs } from "@heroui/react";
import { Navbar } from "@package/ui";
import { createNavMenuItems, type NavMenuSocialLinks } from "./NavMenuItems";
import type { QuickMenuProps } from "~/components/actions/quick-menu/QuickMenu";
import { QuickMenu } from "~/components/actions/quick-menu/QuickMenu";

export interface NavbarContentProps {
  quickMenu: QuickMenuProps;
  socialLinks: NavMenuSocialLinks;
  avatarName: string;
}

export function NavbarContent({ quickMenu, socialLinks, avatarName }: NavbarContentProps): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const menuItems = useMemo(() => createNavMenuItems(socialLinks), [socialLinks]);

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

  const activeItem = menuItems.find((item) => item.id === activeTab);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const updateDropdownPosition = useCallback(() => {
    if (!tabsContainerRef.current || !activeItem?.children) {
      return;
    }
    const activeTabEl = tabsContainerRef.current.querySelector('[aria-selected="true"]') as HTMLElement | null;
    if (activeTabEl) {
      setDropdownLeft(activeTabEl.offsetLeft);
    }
  }, [activeItem]);

  useEffect(() => {
    updateDropdownPosition();
  }, [updateDropdownPosition]);

  const centerElement = (
    <div className="relative" ref={tabsContainerRef}>
      <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Navigation">
            {menuItems.map((item, index) => (
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
      {activeItem?.children && (
        <div
          style={{ left: dropdownLeft }}
          className="bg-background absolute top-full z-10 mt-2 flex flex-col gap-1 rounded-lg border p-2 shadow-lg"
        >
          {activeItem.children.map((child) => (
            <Link
              key={child.id}
              href={child.href}
              target={child.external ? "_blank" : undefined}
              rel={child.external ? "noreferrer" : undefined}
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
    <div className="hidden sm:block">
      <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Popover.Trigger data-testid="home-page__menu-button">
          <Avatar variant="soft" className="cursor-pointer">
            <Avatar.Fallback>{getAvatarFallback(avatarName)}</Avatar.Fallback>
          </Avatar>
        </Popover.Trigger>
        <Popover.Content placement="bottom end">
          <Popover.Dialog className="p-2">
            <QuickMenu
              onSettings={() => {
                setIsPopoverOpen(false);
                quickMenu.onSettings();
              }}
              onLogout={() => {
                setIsPopoverOpen(false);
                quickMenu.onLogout();
              }}
            />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );

  const menuElement = (
    <div className="flex h-full flex-col">
      <nav className="flex-1 px-4 py-4">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
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
                            target={child.external ? "_blank" : undefined}
                            rel={child.external ? "noreferrer" : undefined}
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
        <QuickMenu {...quickMenu} />
      </div>
    </div>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuElement} endElement={endElement} />;
}
