import {
  logOut as logOutAction,
  receiveTokens as receiveTokensAction,
} from './slice';
import store from './store';
import { SessionTokens } from './types';

export const logOut = (): void => {
  store.dispatch(logOutAction());
};

export const receiveTokens = (tokens: SessionTokens): void => {
  store.dispatch(receiveTokensAction(tokens));
};

export const getSessionState = () => {
  return store.getState();
};
