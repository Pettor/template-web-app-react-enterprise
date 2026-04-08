import { useThemeSwitcher } from "~/components/actions/theme-switch/UseThemeSwitcher";
import type { HomeViewProps } from "~/components/views/home/HomeView";
import { useAppSessionContent } from "~/core/session/UseAppSessionContent";
import { useAppSocialLinks } from "~/core/social-links/UseAppSocialLinks";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const appSessionProps = useAppSessionContent({ to: "/version" });
  const themeSwitchProps = useThemeSwitcher();
  const socialLinkProps = useAppSocialLinks(githubLink, linkedInLink);

  return {
    navbarContentProps: {
      profile: appSessionProps,
      socialLinks: socialLinkProps,
      themeSwitch: themeSwitchProps,
    },
  };
}
