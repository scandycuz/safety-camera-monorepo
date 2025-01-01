export interface SessionState {
  readonly isLoggedIn: boolean;
}

export interface SessionStoreState {
  readonly session: SessionState;
}

export interface SessionTokens {
  readonly token: string;
  readonly refreshToken: string;
}

export enum SessionCookies {
  token = 'token',
  refreshToken = 'refreshToken',
}
