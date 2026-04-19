import type { ReactElement } from "react";
import { usePwaLifecycle } from "./UsePwaLifecycle";

interface Props {
  children: ReactElement;
}

export function PwaLifecycle({ children }: Props): ReactElement {
  usePwaLifecycle();

  return <>{children}</>;
}
