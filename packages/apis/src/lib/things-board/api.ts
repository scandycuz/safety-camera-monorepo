import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AlarmsQueryParams,
  AlarmsResponse,
  Notification,
  NotificationsResponse,
  PaginatedResponse,
  SessionTokenBody,
  SessionTokenResponse,
  ApiNotification,
  UserProfileResponse,
  DeviceQueryParams,
  DevicesResponse,
} from './types';
import { baseQueryWithReauth } from './utils';
import dayjs from 'dayjs';
import { receiveSession } from '@smart-safety-solutions/contexts';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    fetchAlarms: build.query<AlarmsResponse, AlarmsQueryParams | void>({
      query: (params: AlarmsQueryParams = { pageSize: 20, page: 0 }) => ({
        url: 'api/v2/alarms',
        params,
      }),
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
    }),
    fetchNotifications: build.query<
      NotificationsResponse,
      AlarmsQueryParams | void
    >({
      query: (params: AlarmsQueryParams = { pageSize: 100, page: 0 }) => ({
        url: 'api/notifications',
        params,
      }),
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
      transformResponse: (
        resp: PaginatedResponse<ApiNotification>
      ): PaginatedResponse<Notification> => {
        const formattedData = resp.data.map((item) => {
          const parsedDate = dayjs(item.createdTime);
          const readableDate = parsedDate.format('MMM Do');

          return {
            ...item,
            readableDate,
          };
        });

        return {
          ...resp,
          data: formattedData,
        };
      },
    }),
    logIn: build.mutation<SessionTokenResponse, SessionTokenBody>({
      query: (body) => ({
        url: 'api/auth/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (body, { queryFulfilled }) => {
        try {
          const resp = await queryFulfilled;
          receiveSession(resp.data);
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
    }),
    fetchUserProfile: build.query<UserProfileResponse, string>({
      query: (userId) => ({
        url: `api/user/${userId}`,
      }),
      onQueryStarted: async (body, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
    }),
    fetchDevices: build.query<DevicesResponse, DeviceQueryParams>({
      query: ({ customerId, pageSize = 100, page = 0, ...params }) => ({
        url: `api/customer/${customerId}/deviceInfos`,
        params: { pageSize, page, ...params },
      }),
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
    }),
  }),
});

export const {
  useFetchAlarmsQuery,
  useFetchNotificationsQuery,
  useFetchUserProfileQuery,
  useFetchDevicesQuery,
  useLogInMutation,
} = api;

export default api;
