import type { AppbarProps } from "~/components/navigation/appbar";

export const AppbarCommonData: AppbarProps = {
  profile: {
    name: "John Doe",
    email: "john.doe@mailcom",
    onAbout: () => console.log("onAbout"),
    onLogout: () => console.log("onLogout"),
  },
  socialLinks: {
    onGithubClick: () => console.log("onGithubClick"),
    onLinkedInClick: () => console.log("onLinkedInClick"),
  },
  themeSwitch: {
    mode: "light",
    onSwitch: () => console.log("onToggle"),
  },
};
