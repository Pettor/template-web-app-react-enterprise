import type { ReactElement } from "react";
import { Navbar } from "../../Navigation/Navbar/Navbar";
import { StorybookNavbarContentComponent } from "./StorybookNavbarContentComponent";

export function StorybookNavbarComponent(): ReactElement {
  return <Navbar title="Some Title" endElement={<StorybookNavbarContentComponent />} />;
}
