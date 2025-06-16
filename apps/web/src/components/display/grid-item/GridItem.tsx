import { Card, CardBody, CardHeader, Divider, Spacer } from "@heroui/react";
import type { ReactElement } from "react";

export interface GridItemProps {
  title: string;
  imageSrc: string;
  description: string;
}

export function GridItem({ title, imageSrc, description }: GridItemProps): ReactElement {
  return (
    <Card isBlurred className="p-4">
      <CardHeader className="gap-2">
        {imageSrc && <img className="h-6 w-6" src={imageSrc} />}
        <p className="text-lg font-bold">{title}</p>
      </CardHeader>
      <CardBody>
        <div className="px-2">
          <Divider />
          <Spacer y={2} />
          <p>{description}</p>
        </div>
      </CardBody>
    </Card>
  );
}
