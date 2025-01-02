'use client';
import SessionContext from './context';
import { FunctionComponent, useEffect, useState } from 'react';
import { logOut, receiveSession, populateSession } from './utils';
import store from './store';
import { initialSessionState } from './slice';

interface SessionProviderProps {
  readonly children: JSX.Element;
}

const SessionProvider: FunctionComponent<SessionProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState(initialSessionState);

  /**
   * Subscribe to store and re-render when changes, without
   * requiring Redux provider context.
   */
  useEffect(() => {
    store.subscribe(() => {
      const sessionState = store.getState().session;
      setState(sessionState);
    });
  }, []);

  return (
    <SessionContext.Provider
      value={{ state, logOut, populateSession, receiveSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
