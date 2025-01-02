import {
  logOut as logOutAction,
  receiveSession as receiveSessionAction,
  populateSession as populateSessionAction,
} from './slice';
import store from './store';
import { SessionTokens } from './types';

export const logOut = (): void => {
  store.dispatch(logOutAction());
};

export const receiveSession = (tokens: SessionTokens): void => {
  store.dispatch(receiveSessionAction(tokens));
};

export const populateSession = (): void => {
  store.dispatch(populateSessionAction());
};

export const getSessionState = () => {
  return store.getState().session;
};
