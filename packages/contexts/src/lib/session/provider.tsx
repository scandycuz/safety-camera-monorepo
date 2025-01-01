'use client';
import SessionContext from './context';
import { FunctionComponent, useEffect, useState } from 'react';
import { logOut, receiveSessionTokens } from './utils';
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
    const unsubscribe = store.subscribe(() => {
      const sessionState = store.getState().session;
      setState(sessionState);
    });

    return unsubscribe;
  }, []);

  return (
    <SessionContext.Provider value={{ state, logOut, receiveSessionTokens }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
