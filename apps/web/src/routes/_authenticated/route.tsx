import type { ReactElement } from "react";
import { Suspense } from "react";
import { Button } from "@heroui/react";
import { GithubIcon, LinkedInIcon, NavbarLayout } from "@package/ui";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useIntl } from "react-intl";
import { useAuthenticatedRoute } from "./-UseAuthenticatedRoute";
import { NavbarContent } from "~/components/navigation/navbar-content/NavbarContent";
import { RouteLoading } from "~/core/routes/logic/RouteLoading";

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
  const { activeTab, onTabChange, sessionContent, socialLinks, githubLink, linkedInLink } = useAuthenticatedRoute();

  return (
    <NavbarLayout
      footer
      footerText={intl.formatMessage({
        description: "AuthenticatedLayout: footer - attribution",
        defaultMessage: "Made with ☕ by Petter Hancock",
        id: "Jy8iNC",
      })}
      footerCopyright={intl.formatMessage({
        description: "AuthenticatedLayout: footer - copyright",
        defaultMessage: "Copyright © 2024 - All rights reserved",
        id: "9mPCU7",
      })}
      navbarElement={
        <NavbarContent
          quickMenu={{
            onSettings: sessionContent.onSettings,
            onLogout: sessionContent.onLogout,
            onSearch: sessionContent.onSearch,
          }}
          socialLinks={{ github: githubLink, linkedIn: linkedInLink }}
          avatarName={sessionContent.name}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      }
      footerContent={
        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            variant="secondary"
            onPress={socialLinks.onGithubClick}
            aria-label={intl.formatMessage({
              description: "AuthenticatedLayout: aria-label - GitHub social link",
              defaultMessage: "GitHub",
              id: "MXiQP4",
            })}
          >
            <span className="flex h-5 w-5 items-center justify-center fill-current">
              <GithubIcon />
            </span>
          </Button>
          <Button
            isIconOnly
            variant="secondary"
            onPress={socialLinks.onLinkedInClick}
            aria-label={intl.formatMessage({
              description: "AuthenticatedLayout: aria-label - LinkedIn social link",
              defaultMessage: "LinkedIn",
              id: "aM82tP",
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
