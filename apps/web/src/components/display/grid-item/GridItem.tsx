import type { ReactElement } from "react";
import { Card, CardContent, CardHeader, Separator } from "@heroui/react";
import { useIntl } from "react-intl";

export interface GridItemProps {
  title: string;
  imageSrc: string;
  description: string;
}

export function GridItem({ title, imageSrc, description }: GridItemProps): ReactElement {
  const intl = useIntl();
  return (
    <Card className="p-4 transition-shadow hover:shadow-lg">
      <CardHeader className="gap-3">
        {imageSrc && (
          <img
            className="h-7 w-7"
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
      <CardContent className="flex flex-col gap-3">
        <Separator />
        <p className="text-foreground/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
