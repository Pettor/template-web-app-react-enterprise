import type { ReactElement } from "react";
import { NavbarContentCommonData } from "../data/NavbarContentData";
import { NavbarContent } from "~/components/navigation/navbar-content/NavbarContent";

export function StorybookNavbarContentComponent(): ReactElement {
  return <NavbarContent {...NavbarContentCommonData} />;
}
