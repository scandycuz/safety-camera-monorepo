'use client';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@smart-safety-solutions/components';
import { FunctionComponent, useContext } from 'react';
import AppContext from '../contexts/app/context';

const AlertsSidebar: FunctionComponent = () => {
  const { setisAlertsSheetOpen } = useContext(AppContext);

  const handleClose = () => {
    setisAlertsSheetOpen(false);
  };

  return (
    <SheetContent onClose={handleClose}>
      <SheetHeader>
        <SheetTitle>Lorem ipsum dolor sit amet</SheetTitle>
        <SheetDescription>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AlertsSidebar;
