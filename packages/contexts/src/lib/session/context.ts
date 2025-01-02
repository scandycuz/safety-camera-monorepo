'use client';
import { createContext } from 'react';
import { initialSessionState } from './slice';
import { logOut, populateSession, receiveSession } from './utils';

const initialContext = {
  state: initialSessionState,
  logOut,
  receiveSession,
  populateSession,
};

const SessionContext = createContext(initialContext);

export default SessionContext;
