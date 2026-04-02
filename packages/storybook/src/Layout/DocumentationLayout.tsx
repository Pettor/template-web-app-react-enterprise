import type { ReactElement, ReactNode } from "react";
import { Card, CardContent } from "@heroui/react";

interface Props {
  label: string;
  children: ReactNode;
}

export function DocumentationLayout({ label, children }: Props): ReactElement {
  return (
    <div className="md:m-4">
      <Card className="p-4">
        <CardContent>
          <p className="text-3xl md:text-5xl">{label}</p>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
