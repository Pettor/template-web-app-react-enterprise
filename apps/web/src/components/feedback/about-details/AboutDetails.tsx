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
                  description: "AboutDetails: label - app name",
                  defaultMessage: "Name:",
                  id: "MbFwnp",
                })}
              </TableCell>
              <TableCell className="">{appName}</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutDetails: label - app version",
                  defaultMessage: "App Version",
                  id: "eTM4MF",
                })}
              </TableCell>
              <TableCell>{appVersion}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell className="font-semibold">
                {intl.formatMessage({
                  description: "AboutDetails: label - server version",
                  defaultMessage: "Server version",
                  id: "xBAyfF",
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
