'use client';
import { FunctionComponent, ReactNode } from 'react';
import store from './store';
import { Provider } from 'react-redux';

interface ApiProviderProps {
  readonly children: ReactNode;
}

/**
 * Provider for the RTK Query API. This provider must be nested inside
 * of any other Redux providers in an app.
 *
 * @param props provider props
 * @returns the RTK Query API provider component
 */
const ApiProvider: FunctionComponent<ApiProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ApiProvider;
