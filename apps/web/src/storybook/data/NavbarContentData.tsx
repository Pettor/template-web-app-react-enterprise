import type { NavbarContentProps } from "~/components/navigation/navbar-content";

export const NavbarContentCommonData: NavbarContentProps = {
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
