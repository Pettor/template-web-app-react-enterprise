import type { ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useIntl } from "react-intl";
import { BasicLayout, BlueFadeBackground, GridBackground } from "@package/ui";
import { AboutDetails, type AboutDetailsProps } from "~/components/feedback/about-details/AboutDetails";
import { Button, Card, CardBody, CardHeader, Divider, Spacer } from "@heroui/react";

export interface AboutViewProps extends AboutDetailsProps {
  onBack: () => void;
}

export function AboutView({ onBack, ...aboutProps }: AboutViewProps): ReactElement {
  const intl = useIntl();

  return (
    <BasicLayout
      className="dark:bg-base-300/70"
      backgroundElement={
        <>
          <BlueFadeBackground />
          <GridBackground />
        </>
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-1 p-4 lg:flex-row-reverse">
        <div className="bg-base-100 h-full min-h-[550px] w-full shrink-0 sm:w-[550px]">
          <Card className="min-h-[550px]">
            <CardHeader className="flex w-full items-end justify-between">
              <div className="flex"></div>
              <Button
                onPress={onBack}
                isIconOnly
                title={intl.formatMessage({
                  description: "AboutView - Back button title",
                  defaultMessage: "Back",
                  id: "72q+Ui",
                })}
                aria-label={intl.formatMessage({
                  description: "AboutView - Back button aria label",
                  defaultMessage: "Back",
                  id: "ZTBga3",
                })}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardBody>
              <div className="p-4">
                <p className="text-2xl font-bold">
                  {intl.formatMessage({
                    description: "About - Title",
                    defaultMessage: "About",
                    id: "2Rm6Lp",
                  })}
                </p>
                <Spacer y={4} />
                <Divider />
                <Spacer y={4} />
                <AboutDetails {...aboutProps} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </BasicLayout>
  );
}
