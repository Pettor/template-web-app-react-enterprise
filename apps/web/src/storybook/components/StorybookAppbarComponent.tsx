import type { ReactElement } from "react";
import { AppbarCommonData } from "../data/AppbarData";
import { Appbar } from "~/components/navigation/appbar";

export function StorybookAppbarComponent(): ReactElement {
  return <Appbar {...AppbarCommonData} />;
}
