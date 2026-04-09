import type { HomeViewProps } from "~/components/views/home/HomeView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const sessionContent = useAppSessionContent();

  return {
    navbarContentProps: {
      quickMenu: {
        onSettings: sessionContent.onSettings,
        onLogout: sessionContent.onLogout,
      },
      socialLinks: { github: githubLink, linkedIn: linkedInLink },
      avatarName: sessionContent.name,
    },
  };
}
