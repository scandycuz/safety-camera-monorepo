"use client";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@smart-safety-solutions/components";
import { FunctionComponent } from "react";

const Settings: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card className="border-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Settings</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Settings;
