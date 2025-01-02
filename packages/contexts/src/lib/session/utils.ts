import {
  logOut as logOutAction,
  receiveSessionTokens as receiveSessionTokensAction,
} from './slice';
import store from './store';
import { SessionTokens } from './types';

export const logOut = (): void => {
  store.dispatch(logOutAction());
};

export const receiveSessionTokens = (tokens: SessionTokens): void => {
  store.dispatch(receiveSessionTokensAction(tokens));
};

export const getSessionState = () => {
  return store.getState().session;
};
