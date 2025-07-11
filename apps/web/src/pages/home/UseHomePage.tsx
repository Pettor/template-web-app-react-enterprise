import { useAppSessionContent } from "~/classes/app-session/UseAppSessionContent";
import { useAppSocialLinks } from "~/classes/app-social-links/UseAppSocialLinks";
import { useThemeSwitcher } from "~/components/actions/theme-switch/UseThemeSwitcher";
import type { HomeViewProps } from "~/components/views/home/HomeView";

export function useHomePage(githubLink: string, linkedInLink: string): HomeViewProps {
  const appSessionProps = useAppSessionContent("/version");
  const themeSwitchProps = useThemeSwitcher();
  const socialLinkProps = useAppSocialLinks(githubLink, linkedInLink);

  return {
    appNavbarProps: {
      profile: appSessionProps,
      socialLinks: socialLinkProps,
      themeSwitch: themeSwitchProps,
    },
  };
}
