import type { HomeViewProps } from "~/components/views/home/HomeView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const appSessionProps = useAppSessionContent({ to: "/version" });

  return {
    navbarContentProps: {
      account: appSessionProps,
      socialLinks: { github: githubLink, linkedIn: linkedInLink },
    },
  };
}
