'use client';
import { SessionContext } from '@smart-safety-solutions/contexts';
import AlarmsGraph from '../../components/alarms-graph';
import { FunctionComponent, useContext, useEffect } from 'react';

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
    <div className="flex flex-1 flex-col p-4">
      <AlarmsGraph />
    </div>
  );
};

export default Dashboard;
