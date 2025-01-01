'use client';
import { createContext } from 'react';
import { initialSessionState } from './slice';
import { logOut, receiveTokens } from './utils';

const initialContext = {
  state: initialSessionState,
  logOut,
  receiveTokens,
};

const SessionContext = createContext(initialContext);

export default SessionContext;
