import type { HomeViewProps } from "~/components/views/home/HomeView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const appSessionProps = useAppSessionContent({ to: "/version" });
  const socialLinkProps = useAppSocialLinks(githubLink, linkedInLink);

  return {
    navbarContentProps: {
      account: appSessionProps,
      socialLinks: socialLinkProps,
    },
  };
}
