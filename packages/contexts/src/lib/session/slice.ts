import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionCookies, SessionState, SessionTokens } from './types';
import Cookies from 'js-cookie';

const isLoggedIn = !!Cookies.get(SessionCookies.token);

export const initialSessionState: SessionState = {
  isLoggedIn,
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
    receiveTokens: (state, { payload }: PayloadAction<SessionTokens>) => {
      Cookies.set(SessionCookies.token, payload.token);
      Cookies.set(SessionCookies.refreshToken, payload.refreshToken);

      state.isLoggedIn = true;
    },
  },
});

export const { logOut, receiveTokens } = sessionSlice.actions;

export default sessionSlice.reducer;
