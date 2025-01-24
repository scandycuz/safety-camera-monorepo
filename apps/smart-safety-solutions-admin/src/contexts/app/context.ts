'use client';
import { createContext } from 'react';
import { initialAppState } from './slice';
import { setisAlertsSheetOpen } from './utils';

const initialContext = {
  state: initialAppState,
  setisAlertsSheetOpen,
};

const AppContext = createContext(initialContext);

export default AppContext;
