'use client';
import { SessionContext } from '@smart-safety-solutions/contexts';
import AlertsGraph from '../../components/alerts-graph';
import { FunctionComponent, useContext, useEffect } from 'react';
import AlertsTable from '../../components/alerts-table';
import AlertsSheet from '../../components/alerts-sheet';
import { SheetProvider } from '@smart-safety-solutions/components';
import AppContext from '../../contexts/app/context';

const Dashboard: FunctionComponent = () => {
  const { populateSession } = useContext(SessionContext);
  const {
    state: { isAlertsSheetOpen },
  } = useContext(AppContext);

  /**
   * Populates the session context when an authenticated
   * user lands on the dashboard.
   */
  useEffect(() => {
    populateSession();
  }, [populateSession]);

  return (
    <SheetProvider open={isAlertsSheetOpen}>
      <div className="flex flex-1 flex-col p-4 gap-4">
        <AlertsSheet />

        <AlertsGraph />

        <div className="px-4">
          <AlertsTable />
        </div>
      </div>
    </SheetProvider>
  );
};

export default Dashboard;
