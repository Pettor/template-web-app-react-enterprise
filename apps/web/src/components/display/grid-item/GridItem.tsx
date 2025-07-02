import type { ReactElement } from "react";
import { Card, CardBody, CardHeader, Divider, Spacer } from "@heroui/react";
import { useIntl } from "react-intl";

export interface GridItemProps {
  title: string;
  imageSrc: string;
  description: string;
}

export function GridItem({ title, imageSrc, description }: GridItemProps): ReactElement {
  const intl = useIntl();
  return (
    <Card isBlurred className="p-4">
      <CardHeader className="gap-2">
        {imageSrc && (
          <img
            className="h-6 w-6"
            src={imageSrc}
            aria-label={intl.formatMessage({
              description: "GridItem - Image alt text",
              defaultMessage: "Grid item image",
              id: "LIgdXO",
            })}
          />
        )}
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
