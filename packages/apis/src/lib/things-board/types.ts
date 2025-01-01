export interface SessionTokenBody {
  readonly username: string;
  readonly password: string;
}

export interface SessionTokenResponse {
  readonly token: string;
  readonly refreshToken: string;
}
