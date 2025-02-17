"use client";
import {
  EntityType,
  useFetchEntitiesQuery,
} from "@smart-safety-solutions/apis";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@smart-safety-solutions/components";
import { Trash2Icon } from "lucide-react";
import { SessionContext } from "@smart-safety-solutions/contexts";
import { FunctionComponent, useContext } from "react";

const CrewsTable: FunctionComponent = () => {
  const {
    state: { customerId },
  } = useContext(SessionContext);

  const { data: { data: crews } = { data: [] } } = useFetchEntitiesQuery(
    { customerId, type: EntityType.CREW },
    { skip: !customerId }
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Created</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Label</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {crews.map((crew) => {
          return (
            <TableRow
              key={`formatted-alert-${crew.id.id}`}
              className="cursor-pointer"
            >
              <TableCell>
                {crew.readableDate}, {crew.readableTime}
              </TableCell>
              <TableCell>{crew.name}</TableCell>
              <TableCell>{crew.label}</TableCell>
              <TableCell className="flex flex-row justify-end">
                <Button variant="ghost">
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CrewsTable;
