'use client';
import { SessionContext } from '@smart-safety-solutions/contexts';
import { FunctionComponent, useContext, useEffect } from 'react';
import HeaderBar from '../../components/header-bar';

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
    <div className="flex flex-col w-full">
      <HeaderBar />
    </div>
  );
};

export default Dashboard;
