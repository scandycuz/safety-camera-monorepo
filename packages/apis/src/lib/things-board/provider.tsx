'use client';
import { FunctionComponent, ReactNode } from 'react';
import store from './store';
import { Provider } from 'react-redux';

interface ApiProviderProps {
  readonly children: ReactNode;
}

const ApiProvider: FunctionComponent<ApiProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ApiProvider;
