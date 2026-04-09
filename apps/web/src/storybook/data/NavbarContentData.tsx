import type { NavbarContentProps } from "~/components/navigation/navbar-content";

export const NavbarContentCommonData: NavbarContentProps = {
  quickMenu: {
    onSettings: () => console.log("onSettings"),
    onLogout: () => console.log("onLogout"),
  },
  socialLinks: {
    github: "https://github.com",
    linkedIn: "https://linkedin.com",
  },
  avatarName: "John Doe",
};
