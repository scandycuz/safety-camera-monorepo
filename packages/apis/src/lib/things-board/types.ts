export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface QueryParams {
  readonly pageSize: number;
  readonly page: number;
  readonly textSearch?: string;
  readonly sortOrder?: SortOrder;
  readonly startTime?: string;
}

export interface SessionTokenBody {
  readonly username: string;
  readonly password: string;
}

export interface SessionTokenResponse {
  readonly token: string;
  readonly refreshToken: string;
}

export interface AlarmsQueryParams extends QueryParams {
  readonly statusList?: ReadonlyArray<
    'ANY' | 'ACTIVE' | 'CLEARED' | 'ACK' | 'UNACK'
  >;
  readonly typeList?: ReadonlyArray<string>;
  readonly assigneeId?: string;
  readonly severityList?: ReadonlyArray<
    'CRITICAL' | 'MAJOR' | 'MINOR' | 'WARNING' | 'INDETERMINATE'
  >;
  readonly sortProperty?:
    | 'createdTime'
    | 'startTs'
    | 'endTs'
    | 'type'
    | 'ackTs'
    | 'clearTs'
    | 'severity'
    | 'status';
}

export interface AlarmsResponse {
  readonly id: {
    readonly id: string;
    readonly entityType: string;
  };
}
