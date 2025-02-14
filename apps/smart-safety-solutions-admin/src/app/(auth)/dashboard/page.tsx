"use client";
import AlertsGraph from "../../../components/alerts-graph";
import { FunctionComponent, useContext } from "react";
import AlertsTable from "../../../components/alerts-table";
import AlertsSheet from "../../../components/alerts-sheet";
import { SheetProvider } from "@smart-safety-solutions/components";
import AppContext from "../../../contexts/app/context";
import AlertsPieChart from "../../../components/alerts-pie-chart";

const Dashboard: FunctionComponent = () => {
  const {
    state: { isAlertsSheetOpen },
  } = useContext(AppContext);

  return (
    <SheetProvider open={isAlertsSheetOpen}>
      <div className="flex flex-1 flex-col p-4 gap-6">
        <AlertsSheet />

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
    </SheetProvider>
  );
};

export default Dashboard;
