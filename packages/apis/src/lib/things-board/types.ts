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

export interface PaginatedResponse<T> {
  readonly data: ReadonlyArray<T>;
  readonly totalPage: number;
  readonly totalElement: number;
  readonly hasNext: boolean;
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

export interface ApiNotification {
  readonly id: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly requestId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly recepientId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly type: string;
  readonly deliveryMethod: string;
  readonly subject: string;
  readonly text: string;
  readonly info: {
    readonly dashboardId: {
      readonly id: string;
      readonly entityType: string;
    };
    readonly stateEntityId: {
      readonly id: string;
      readonly entityType: string;
    };
    readonly alarmOriginator: {
      readonly id: string;
      readonly entityType: string;
    };
    readonly action: 'created' | 'cleared';
    readonly type: string;
  };
  readonly status: string;
  readonly createdTime: number;
}

export interface Notification extends ApiNotification {
  readonly readableDate: string;
}

export type NotificationsResponse = PaginatedResponse<Notification>;
