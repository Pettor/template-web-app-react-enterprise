import { useLocation, useNavigate } from "@tanstack/react-router";
import type { AppSessionContent } from "~/core/session/AppSessionContent";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import type { AppSocialLinks } from "~/core/social-links/AppSocialLinks";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";
import type { UseSyncStatusCardResult } from "~/core/sync/UseSyncStatusCard";
import { useSyncStatusCard } from "~/core/sync/UseSyncStatusCard";

const GITHUB_LINK = "https://github.com/Pettor/template-web-app-react";
const LINKEDIN_LINK = "https://www.linkedin.com/in/petter-hancock/";

export interface UseAuthenticatedRouteResult {
  activeTab: string;
  onTabChange: (id: string) => void;
  sessionContent: AppSessionContent;
  socialLinks: AppSocialLinks;
  syncStatus: UseSyncStatusCardResult;
  githubLink: string;
  linkedInLink: string;
}

export function useAuthenticatedRoute(): UseAuthenticatedRouteResult {
  const navigate = useNavigate();
  const pathname = useLocation({ select: (state) => state.pathname });
  const sessionContent = useAppSessionContent();
  const socialLinks = useAppSocialLinks(GITHUB_LINK, LINKEDIN_LINK);
  const syncStatus = useSyncStatusCard();

  let activeTab = "home";
  if (pathname.startsWith("/dashboard")) {
    activeTab = "dashboard";
  } else if (pathname.startsWith("/notes")) {
    activeTab = "notes";
  }

  function handleTabChange(id: string): void {
    if (id === "dashboard") {
      navigate({ to: "/dashboard" });
      return;
    }
    if (id === "notes") {
      navigate({ to: "/notes" });
      return;
    }
    navigate({ to: "/" });
  }

  return {
    activeTab,
    onTabChange: handleTabChange,
    sessionContent,
    socialLinks,
    syncStatus,
    githubLink: GITHUB_LINK,
    linkedInLink: LINKEDIN_LINK,
  };
}
