'use client';
import { SessionContext } from '@smart-safety-solutions/contexts';
import AlertsGraph from '../../components/alerts-graph';
import { FunctionComponent, useContext, useEffect } from 'react';
import AlertsTable from '../../components/alerts-table';

const Dashboard: FunctionComponent = () => {
  const { populateSession } = useContext(SessionContext);

  /**
   * Populates the session context when an authenticated
   * user lands on the dashboard.
   */
  useEffect(() => {
    populateSession();
  }, [populateSession]);

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <AlertsGraph />

      <div className="px-4">
        <AlertsTable />
      </div>
    </div>
  );
};

export default Dashboard;
