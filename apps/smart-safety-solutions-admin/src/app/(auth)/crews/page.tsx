"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@smart-safety-solutions/components";
import CrewsTable from "../../../components/crews-table";
import { FunctionComponent } from "react";

const Crews: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <Card className="border-none shadow-none">
        <CardHeader className="relative">
          <CardTitle>Crews</CardTitle>
          <Button className="absolute top-2 right-2">Add Crew</Button>
        </CardHeader>
        <CardContent>
          <CrewsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Crews;
