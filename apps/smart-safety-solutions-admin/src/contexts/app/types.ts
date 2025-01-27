export interface AppState {
  readonly isAlertsSheetOpen: boolean;
  readonly selectedAlert: string;
}

export interface AppStoreState {
  readonly app: AppState;
}
