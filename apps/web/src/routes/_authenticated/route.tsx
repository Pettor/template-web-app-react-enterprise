import type { ReactElement } from "react";
import { Suspense } from "react";
import { Button } from "@heroui/react";
import { GithubIcon, LinkedInIcon, NavbarLayout } from "@package/ui";
import { Outlet, createFileRoute, redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { NavbarContent } from "~/components/navigation/navbar-content";
import { RouteLoading } from "~/core/routes/logic/RouteLoading";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";

const GITHUB_LINK = "https://github.com/Pettor/template-web-app-react";
const LINKEDIN_LINK = "https://www.linkedin.com/in/petter-hancock/";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { authStatus } = context;

    // Redirect to login if user is not authenticated
    if (authStatus !== "authenticated") {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout(): ReactElement {
  const intl = useIntl();
  const navigate = useNavigate();
  const pathname = useLocation({ select: (state) => state.pathname });
  const sessionContent = useAppSessionContent();
  const { onGithubClick, onLinkedInClick } = useAppSocialLinks(GITHUB_LINK, LINKEDIN_LINK);

  const activeTab = pathname.startsWith("/dashboard") ? "dashboard" : "home";

  function handleTabChange(id: string): void {
    if (id === "dashboard") {
      navigate({ to: "/dashboard" });
      return;
    }
    navigate({ to: "/" });
  }

  return (
    <NavbarLayout
      footer
      footerText={intl.formatMessage({
        description: "NavbarLayout - Footer attribution text",
        defaultMessage: "Made with ☕ by Petter Hancock",
        id: "rnZMTQ",
      })}
      footerCopyright={intl.formatMessage({
        description: "NavbarLayout - Footer copyright text",
        defaultMessage: "Copyright © 2024 - All rights reserved",
        id: "ZSiTwu",
      })}
      navbarElement={
        <NavbarContent
          quickMenu={{
            onSettings: sessionContent.onSettings,
            onLogout: sessionContent.onLogout,
          }}
          socialLinks={{ github: GITHUB_LINK, linkedIn: LINKEDIN_LINK }}
          avatarName={sessionContent.name}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      }
      footerContent={
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            variant="secondary"
            onPress={onGithubClick}
            aria-label={intl.formatMessage({
              description: "AuthenticatedLayout - GitHub social link aria label",
              defaultMessage: "GitHub",
              id: "SDErQK",
            })}
          >
            <span className="flex h-5 w-5 items-center justify-center fill-current">
              <GithubIcon />
            </span>
          </Button>
          <Button
            isIconOnly
            variant="secondary"
            onPress={onLinkedInClick}
            aria-label={intl.formatMessage({
              description: "AuthenticatedLayout - LinkedIn social link aria label",
              defaultMessage: "LinkedIn",
              id: "NrytMV",
            })}
          >
            <span className="flex h-5 w-5 items-center justify-center fill-current">
              <LinkedInIcon />
            </span>
          </Button>
        </div>
      }
    >
      <Suspense fallback={<RouteLoading />}>
        <Outlet />
      </Suspense>
    </NavbarLayout>
  );
}
