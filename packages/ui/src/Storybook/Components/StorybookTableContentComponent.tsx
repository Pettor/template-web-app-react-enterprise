import type { ReactElement } from "react";
import { faker } from "@faker-js/faker";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableContent } from "@heroui/react";

export function StorybookTableContentComponent(): ReactElement {
  return (
    <Table>
      <TableContent>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 150 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{faker.internet.username()}</TableCell>
              <TableCell>{faker.internet.email()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
  );
}
