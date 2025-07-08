import type { ReactElement } from "react";
import { usePwaProviderModule } from "./UsePwaProviderModule";

interface Props {
  children: ReactElement;
}

export function PwaProviderModule({ children }: Props): ReactElement {
  usePwaProviderModule();

  return <>{children}</>;
}
