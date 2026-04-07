import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardContent, CardHeader } from "@heroui/react";
import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import { useIntl } from "react-intl";
import { AboutDetails, type AboutDetailsProps } from "~/components/feedback/about-details/AboutDetails";

export interface AboutViewProps extends AboutDetailsProps {
  onBack: () => void;
}

export function AboutView({ onBack, ...aboutProps }: AboutViewProps): ReactElement {
  const intl = useIntl();

  return (
    <BasicLayout
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 p-4 lg:flex-row-reverse">
        <div className="h-full min-h-[550px] w-full shrink-0 sm:w-[550px]">
          <Card className="min-h-[550px]" variant="tertiary">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex"></div>
              <Button
                isIconOnly
                variant="secondary"
                onPress={onBack}
                aria-label={intl.formatMessage({
                  description: "AboutView - Back button aria label",
                  defaultMessage: "Back",
                  id: "ZTBga3",
                })}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent>
              <AboutDetails {...aboutProps} />
            </CardContent>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
