export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface QueryParams {
  readonly pageSize?: number;
  readonly page?: number;
  readonly textSearch?: string;
  readonly sortOrder?: SortOrder;
  readonly sortProperty?: string;
  readonly startTime?: number;
  readonly endTime?: number;
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

export interface ApiAlarm {
  readonly id: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly tenantId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly customerId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly originator: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly assigneeId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly assignee: {
    readonly id: string;
    readonly entityType: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
  };
  readonly name: string;
  readonly details: object;
  readonly propogateRelationTypes: ReadonlyArray<string>;
  readonly createdTime: number;
  readonly type: string;
  readonly severity: string;
  readonly acknowledged: boolean;
  readonly cleared: boolean;
  readonly startTs: number;
  readonly endTs: number;
  readonly ackTs: number;
  readonly clearTs: number;
  readonly assignTs: number;
  readonly propogate: boolean;
  readonly propogateToOwner: boolean;
  readonly propogateToTenant: boolean;
  readonly originatorName: string;
  readonly originatorLabel: string;
  readonly status: string;
}

export interface Alarm extends ApiAlarm {
  readonly readableDate: string;
}

export type AlarmsResponse = PaginatedResponse<Alarm>;

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

export interface UserProfileResponse {
  readonly id: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly tenantId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly customerId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly email: string;
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly createdTime: number;
  readonly additionalInfo: {
    readonly description: '';
    readonly defaultDashboardId?: string;
    readonly defaultDashboardFullscreen: boolean;
    readonly homeDashboardId?: null;
    readonly homeDashboardHideToolbar?: boolean;
    readonly userCredentialsEnabled?: boolean;
    readonly failedLoginAttempts: 0;
    readonly lastLoginTs: number;
  };
}

export interface DeviceQueryParams extends QueryParams {
  readonly customerId: string;
  readonly deviceProfileId?: string;
  readonly active?: boolean;
  readonly textSearch?: string;
}

export interface Device {
  readonly createdTime: string;
  readonly name: string;
  readonly type: string;
  readonly label: string;
  readonly firmwareId?: string;
  readonly softwareId?: string;
  readonly externalId?: string;
  readonly customerTitle: string;
  readonly customerIsPublic: boolean;
  readonly deviceProfileName: string;
  readonly active: boolean;
  readonly id: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly tenantId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly customerId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly deviceProfileId: {
    readonly id: string;
    readonly entityType: string;
  };
  readonly additionalInfo: {
    readonly gateway: boolean;
    readonly overwriteActivityTime: boolean;
    readonly description: string;
  };
  readonly deviceData: {
    readonly configuration: {
      readonly type: string;
    };
    readonly transportationConfiguration: {
      readonly type: string;
    };
  };
}

export type DevicesResponse = PaginatedResponse<Device>;
