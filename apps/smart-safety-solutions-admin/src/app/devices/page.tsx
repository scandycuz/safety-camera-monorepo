"use client";
import { FunctionComponent } from "react";
import DevicesTable from "../../components/devices-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@smart-safety-solutions/components";

const Devices: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <DevicesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Devices;
