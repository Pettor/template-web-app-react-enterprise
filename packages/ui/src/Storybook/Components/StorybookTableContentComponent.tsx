import type { ReactElement } from "react";
import { faker } from "@faker-js/faker";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@heroui/react";

export function StorybookTableContentComponent(): ReactElement {
  return (
    <Table isCompact removeWrapper>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 150 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{faker.internet.username()}</TableCell>
            <TableCell>
              <User
                avatarProps={{ radius: "lg", src: faker.image.avatar() }}
                description={faker.internet.email()}
                name={faker.internet.displayName()}
              >
                {faker.internet.email()}
              </User>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
