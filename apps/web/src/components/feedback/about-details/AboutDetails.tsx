import type { ReactElement } from "react";
import { Table, TableContent, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useIntl } from "react-intl";

export interface AboutDetailsProps {
  appName: string;
  appVersion: string;
  serverVersion: string;
}

export function AboutDetails({ appName, appVersion, serverVersion }: AboutDetailsProps): ReactElement {
  const intl = useIntl();

  return (
    <div className="items-left flex flex-1 flex-col px-4 md:mt-4">
      <Table aria-label="Example static collection table">
        <TableContent>
          <TableHeader hidden={true}>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutView - App name",
                  defaultMessage: "Name:",
                  id: "S5SFCm",
                })}
              </TableCell>
              <TableCell className="">{appName}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutView - App version",
                  defaultMessage: "App Version",
                  id: "3kCFcr",
                })}
              </TableCell>
              <TableCell>{appVersion}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutView - Server version",
                  defaultMessage: "Server version",
                  id: "7klmPZ",
                })}
              </TableCell>
              <TableCell>{serverVersion}</TableCell>
            </TableRow>
          </TableBody>
        </TableContent>
      </Table>
    </div>
  );
}
