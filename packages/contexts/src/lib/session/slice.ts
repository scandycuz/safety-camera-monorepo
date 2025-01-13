import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DecodedSessionToken,
  SessionCookies,
  SessionState,
  SessionTokens,
} from './types';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const isLoggedIn = !!Cookies.get(SessionCookies.token);

export const initialSessionState: SessionState = {
  isLoggedIn,
  userId: '',
};

const sessionSlice = createSlice({
  initialState: initialSessionState,
  name: 'session',
  reducers: {
    logOut: (state) => {
      Cookies.remove(SessionCookies.token);
      Cookies.remove(SessionCookies.refreshToken);

      state.isLoggedIn = false;
    },
    receiveSession: (state, { payload }: PayloadAction<SessionTokens>) => {
      Cookies.set(SessionCookies.token, payload.token);
      Cookies.set(SessionCookies.refreshToken, payload.refreshToken);

      state.isLoggedIn = true;
    },
    populateSession: (state) => {
      const token = Cookies.get(SessionCookies.token);

      if (!token) {
        throw new Error('session token not present');
      }

      const decoded = jwtDecode<DecodedSessionToken>(token);

      state.userId = decoded.userId;
    },
  },
});

export const { logOut, populateSession, receiveSession } = sessionSlice.actions;

export default sessionSlice.reducer;
