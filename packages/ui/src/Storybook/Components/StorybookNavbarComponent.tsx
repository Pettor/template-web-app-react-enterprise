import type { ReactElement } from "react";
import { StorybookNavbarContentComponent } from "./StorybookNavbarContentComponent";
import { Navbar } from "../../Navigation/Navbar/Navbar";

export function StorybookNavbarComponent(): ReactElement {
  return <Navbar title="Some Title" endElement={<StorybookNavbarContentComponent />} />;
}
