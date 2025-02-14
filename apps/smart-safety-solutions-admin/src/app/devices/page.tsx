"use client";
import { FunctionComponent } from "react";
import DevicesTable from "../../components/devices-table";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@smart-safety-solutions/components";

const Devices: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card className="border-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Devices</CardTitle>
          <Button className="absolute top-2 right-2">Add Device</Button>
        </CardHeader>
        <CardContent>
          <DevicesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Devices;
