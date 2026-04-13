import type { HomeViewProps } from "~/components/views/home/HomeView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const sessionContent = useAppSessionContent();
  const { onGithubClick, onLinkedInClick } = useAppSocialLinks(githubLink, linkedInLink);

  return {
    navbarContentProps: {
      quickMenu: {
        onSettings: sessionContent.onSettings,
        onLogout: sessionContent.onLogout,
      },
      socialLinks: { github: githubLink, linkedIn: linkedInLink },
      avatarName: sessionContent.name,
    },
    onGithubClick,
    onLinkedInClick,
  };
}
