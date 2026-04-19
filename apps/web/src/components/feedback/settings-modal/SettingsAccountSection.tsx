import type { ReactElement } from "react";
import { Skeleton } from "@heroui/react";
import { useIntl } from "react-intl";

export interface SettingsAccountSectionProps {
  name: string;
  email: string;
}

export function SettingsAccountSection({ name, email }: SettingsAccountSectionProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">
        {intl.formatMessage({
          description: "SettingsAccountSection: heading - section title",
          defaultMessage: "Account",
          id: "nYScHH",
        })}
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-default-500 text-sm">
          {intl.formatMessage({
            description: "SettingsAccountSection: label - name",
            defaultMessage: "Name",
            id: "kAOhT+",
          })}
        </span>
        <span className="font-medium">{name ? name : <Skeleton className="h-5 w-40 rounded-lg" />}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-default-500 text-sm">
          {intl.formatMessage({
            description: "SettingsAccountSection: label - email",
            defaultMessage: "Email",
            id: "RsRJ5U",
          })}
        </span>
        <span className="font-medium">{email ? email : <Skeleton className="h-5 w-48 rounded-lg" />}</span>
      </div>
    </div>
  );
}
