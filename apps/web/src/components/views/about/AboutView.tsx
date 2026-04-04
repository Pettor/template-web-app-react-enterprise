import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardContent, CardHeader, Separator } from "@heroui/react";
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
      <div className="flex w-full flex-col items-center justify-center p-4 lg:flex-row-reverse">
        <div className="w-full shrink-0 sm:w-[500px]">
          <Card className="p-2">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex"></div>
              <Button
                onPress={onBack}
                isIconOnly
                aria-label={intl.formatMessage({
                  description: "AboutView - Back button aria label",
                  defaultMessage: "Back",
                  id: "ZTBga3",
                })}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-4 pb-4">
              <p className="text-2xl font-bold">
                {intl.formatMessage({
                  description: "About - Title",
                  defaultMessage: "About",
                  id: "2Rm6Lp",
                })}
              </p>
              <Separator />
              <AboutDetails {...aboutProps} />
            </CardContent>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
