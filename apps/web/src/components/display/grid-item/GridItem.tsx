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
    <Card
      variant="secondary"
      className="hover:border-accent/40 group h-full p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <CardHeader className="gap-3">
        {imageSrc && (
          <div className="bg-default-100 group-hover:bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
            <img
              className="h-6 w-6"
              src={imageSrc}
              aria-label={intl.formatMessage({
                description: "GridItem: aria-label - item image",
                defaultMessage: "Grid item image",
                id: "MQeEmO",
              })}
            />
          </div>
        )}
        <p className="text-lg font-bold">{title}</p>
      </CardHeader>
      <CardContent>
        <div className="px-2">
          <Separator />
          <div className="h-2" />
          <p className="text-default-600 text-sm leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
