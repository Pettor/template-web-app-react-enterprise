import type { ReactElement } from "react";
import { faker } from "@faker-js/faker";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@heroui/react";

export function StorybookTableContentComponent(): ReactElement {
  return (
    <div className="flex flex-1 justify-center overflow-x-auto">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>AVATAR</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 150 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{faker.internet.displayName()}</TableCell>
              <TableCell>{faker.person.jobArea()}</TableCell>
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
    </div>
  );
}
