"use client";
import AlertsGraph from "../../../components/alerts-graph";
import { FunctionComponent } from "react";
import AlertsTable from "../../../components/alerts-table";
import AlertsPieChart from "../../../components/alerts-pie-chart";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col p-4 gap-6">
      <div className="flex flex-row gap-2">
        <div className="grow">
          <AlertsGraph />
        </div>

        <AlertsPieChart />
      </div>

      <div className="px-4">
        <AlertsTable />
      </div>
    </div>
  );
};

export default Dashboard;
