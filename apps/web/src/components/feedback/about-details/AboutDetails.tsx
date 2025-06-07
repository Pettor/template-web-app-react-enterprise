import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import type { ReactElement } from "react";
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
      <Table hideHeader removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-lg font-semibold">
              {intl.formatMessage({
                description: "AboutView - App name",
                defaultMessage: "Name:",
                id: "S5SFCm",
              })}
            </TableCell>
            <TableCell className="text-lg">{appName}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-lg font-semibold">
              {intl.formatMessage({
                description: "AboutView - App version",
                defaultMessage: "App Version",
                id: "3kCFcr",
              })}
            </TableCell>
            <TableCell className="text-lg">{appVersion}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-lg font-semibold">
              {intl.formatMessage({
                description: "AboutView - Server version",
                defaultMessage: "Server version",
                id: "7klmPZ",
              })}
            </TableCell>
            <TableCell className="text-lg">{serverVersion}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
