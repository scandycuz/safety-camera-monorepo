'use client';
import { createContext } from 'react';
import { initialSessionState } from './slice';
import { logOut, receiveSessionTokens } from './utils';

const initialContext = {
  state: initialSessionState,
  logOut,
  receiveSessionTokens,
};

const SessionContext = createContext(initialContext);

export default SessionContext;
