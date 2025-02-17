"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@smart-safety-solutions/components";
import DeviceImages from "../../../components/device-images";
import { FunctionComponent } from "react";

const Monitor: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card className="border-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Device images</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <DeviceImages />
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitor;
