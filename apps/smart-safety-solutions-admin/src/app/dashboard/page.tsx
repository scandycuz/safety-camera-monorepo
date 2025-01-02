'use client';
import { Button } from '@smart-safety-solutions/components';
import { SessionContext } from '@smart-safety-solutions/contexts';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useContext } from 'react';

const Dashboard: FunctionComponent = () => {
  const { logOut } = useContext(SessionContext);

  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push('/login');
  };

  return (
    <div className="flex min-w-full min-h-full justify-center pt-48">
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default Dashboard;
