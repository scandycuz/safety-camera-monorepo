"use client";
import { SortOrder, useFetchDevicesQuery } from "@smart-safety-solutions/apis";
import {
  Badge,
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
import { FunctionComponent, useContext, useEffect } from "react";

const DevicesTable: FunctionComponent = () => {
  // TODO: Call this in a single place.
  const { populateSession } = useContext(SessionContext);

  /**
   * Populates the session context when an authenticated
   * user lands on the dashboard.
   */
  useEffect(() => {
    populateSession();
  }, [populateSession]);

  const {
    state: { customerId },
  } = useContext(SessionContext);

  const { data: { data: devices } = { data: [] } } = useFetchDevicesQuery(
    { customerId, sortProperty: "createdTime", sortOrder: SortOrder.DESC },
    { skip: !customerId }
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Created</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>State</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {devices.map((device) => {
          return (
            <TableRow
              key={`formatted-alert-${device.id.id}`}
              className="cursor-pointer"
            >
              <TableCell>
                {device.readableDate}, {device.readableTime}
              </TableCell>
              <TableCell>{device.label.replace("Cam id:", "")}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                {device.active ? (
                  <Badge isHoverDisabled={true}>Active</Badge>
                ) : (
                  <Badge isHoverDisabled={true} variant="destructive">
                    Inactive
                  </Badge>
                )}
              </TableCell>
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

export default DevicesTable;
