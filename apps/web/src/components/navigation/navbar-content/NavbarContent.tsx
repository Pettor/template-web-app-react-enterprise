import { useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar, Drawer, Link, Popover, Separator, Tabs } from "@heroui/react";
import { Logo, Navbar } from "@package/ui";
import { useIntl } from "react-intl";
import { createNavMenuItems, type NavMenuSocialLinks } from "./NavMenuItems";
import type { QuickMenuProps } from "~/components/actions/quick-menu/QuickMenu";
import { QuickMenu } from "~/components/actions/quick-menu/QuickMenu";

export interface NavbarContentProps {
  quickMenu: QuickMenuProps;
  socialLinks: NavMenuSocialLinks;
  avatarName: string;
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

export function NavbarContent({
  quickMenu,
  socialLinks,
  avatarName,
  activeTab: activeTabProp = "home",
  onTabChange,
}: NavbarContentProps): ReactElement {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState<string>(activeTabProp);

  useEffect(() => {
    setActiveTab(activeTabProp);
  }, [activeTabProp]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const menuItems = useMemo(() => createNavMenuItems(socialLinks, intl), [socialLinks, intl]);

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
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => {
          const id = String(key);
          setActiveTab(id);
          const item = menuItems.find((m) => m.id === id);
          if (item?.children) {
            return;
          }
          if (onTabChange) {
            onTabChange(id);
          } else if (item?.href) {
            window.location.hash = item.href.replace(/^#/, "");
          }
        }}
      >
        <Tabs.ListContainer>
          <Tabs.List
            aria-label={intl.formatMessage({
              description: "NavbarContent: aria-label - navigation tabs",
              defaultMessage: "Navigation",
              id: "3R8Sia",
            })}
          >
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
        {menuItems.map((item) => (
          <Tabs.Panel key={item.id} id={item.id} className="absolute top-full z-10 mt-2">
            {item.children && (
              <div
                style={{ left: dropdownLeft }}
                className="bg-background flex flex-col gap-1 rounded-lg border p-2 shadow-lg"
              >
                {item.children.map((child) => (
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
          </Tabs.Panel>
        ))}
      </Tabs>
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
              onSearch={() => {
                setIsPopoverOpen(false);
                quickMenu.onSearch();
              }}
            />
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );

  const startElement = (
    <button
      className="sm:hidden"
      aria-label={intl.formatMessage({
        description: "NavbarContent: aria-label - open mobile menu button",
        defaultMessage: "Open menu",
        id: "AEMUUd",
      })}
      onClick={() => setIsDrawerOpen(true)}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  return (
    <>
      <Navbar
        title={intl.formatMessage({
          description: "NavbarContent: heading - app title in navbar",
          defaultMessage: "App",
          id: "15735C",
        })}
        centerElement={centerElement}
        endElement={endElement}
        startElement={startElement}
      />
      <Drawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Backdrop variant="blur">
          <Drawer.Content placement="left">
            <Drawer.Dialog
              aria-label={intl.formatMessage({
                description: "NavbarContent: aria-label - navigation drawer",
                defaultMessage: "Navigation menu",
                id: "he0Edo",
              })}
            >
              <Drawer.Header>
                <div className="flex items-center gap-2">
                  <Logo size="small" />
                  <Drawer.Heading className="font-bold">
                    {intl.formatMessage({
                      description: "NavbarContent: heading - app title in drawer",
                      defaultMessage: "App",
                      id: "BNJJLW",
                    })}
                  </Drawer.Heading>
                </div>
                <Drawer.CloseTrigger />
              </Drawer.Header>
              <Drawer.Body onClick={() => setIsDrawerOpen(false)}>
                <nav>
                  <ul className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        {item.children ? (
                          <>
                            <button
                              className="hover:bg-default-100 flex w-full items-center gap-3 rounded-lg px-3 py-2.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpanded(item.id);
                              }}
                              aria-expanded={expandedItems.has(item.id)}
                              aria-controls={`nav-submenu-${item.id}`}
                            >
                              {item.icon}
                              <span className="flex-1 text-left font-medium">{item.name}</span>
                              <ChevronDownIcon
                                className={`h-4 w-4 transition-transform ${expandedItems.has(item.id) ? "rotate-180" : ""}`}
                                aria-hidden="true"
                              />
                            </button>
                            {expandedItems.has(item.id) && (
                              <ul id={`nav-submenu-${item.id}`} className="ml-8 flex flex-col gap-1 py-1">
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
                          <Link
                            href={item.href}
                            className="hover:bg-default-100 flex items-center gap-3 rounded-lg px-3 py-2.5"
                          >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </Drawer.Body>
              <Drawer.Footer className="flex-col" onClick={() => setIsDrawerOpen(false)}>
                <Separator />
                <QuickMenu
                  onSettings={quickMenu.onSettings}
                  onLogout={quickMenu.onLogout}
                  onSearch={quickMenu.onSearch}
                />
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
