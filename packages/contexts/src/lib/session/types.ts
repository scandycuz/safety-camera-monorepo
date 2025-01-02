export interface SessionState {
  readonly isLoggedIn: boolean;
  readonly firstName: string;
  readonly email: string;
  readonly userId: string;
  readonly tenantId: string;
  readonly customerId: string;
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

export interface DecodedSessionToken {
  readonly firstName: string;
  readonly sub: string;
  readonly userId: string;
  readonly tenantId: string;
  readonly customerId: string;
}
