import type { NavbarContentProps } from "~/components/navigation/navbar-content";

export const NavbarContentCommonData: NavbarContentProps = {
  account: {
    name: "John Doe",
    email: "john.doe@mailcom",
    onAbout: () => console.log("onAbout"),
    onLogout: () => console.log("onLogout"),
  },
  socialLinks: {
    github: "https://github.com",
    linkedIn: "https://linkedin.com",
  },
};
