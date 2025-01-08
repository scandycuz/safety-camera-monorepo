'use client';
import SessionContext from './context';
import { FunctionComponent } from 'react';
import { logOut, receiveSession, populateSession } from './utils';
import store from './store';
import { Provider, useSelector } from 'react-redux';

interface SessionProviderProps {
  readonly children: JSX.Element;
}

type RootState = ReturnType<typeof store.getState>;

const SessionProvider: FunctionComponent<SessionProviderProps> = ({
  children,
}) => {
  const state = useSelector((state: RootState) => state.session);

  return (
    <SessionContext.Provider
      value={{ state, logOut, populateSession, receiveSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const WrappedSessionProvider: FunctionComponent<SessionProviderProps> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default WrappedSessionProvider;
