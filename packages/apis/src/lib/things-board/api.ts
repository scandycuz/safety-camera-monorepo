import { createApi } from "@reduxjs/toolkit/query/react";
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
  Alarm,
  ApiAlarm,
  AlarmResponse,
  AcknowledgeAlarmResponse,
  Tag,
  NotificationsQueryParams,
  AlarmCountRequestBody,
  ApiDevice,
  Device,
  EntitiesResponse,
  ApiEntity,
  Entity,
  EntityQueryParams,
} from "./types";
import { baseQueryWithReauth } from "./utils";
import dayjs from "dayjs";
import { receiveSession } from "@smart-safety-solutions/contexts";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
  transformApiAlarm,
  transformApiDevice,
  transformApiEntity,
  transformApiNotificiation,
} from "./transforms";

dayjs.extend(advancedFormat);

const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [Tag.Alarm, Tag.Entity, Tag.Notification],
  endpoints: (build) => ({
    fetchAlarms: build.query<AlarmsResponse, AlarmsQueryParams | void>({
      query: (params: AlarmsQueryParams = { pageSize: 100, page: 0 }) => ({
        url: "api/v2/alarms",
        params,
      }),
      providesTags: [Tag.Alarm],
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
      transformResponse: (
        resp: PaginatedResponse<ApiAlarm>
      ): PaginatedResponse<Alarm> => {
        const formattedData = resp.data.map((item) => {
          return transformApiAlarm(item);
        });

        return {
          ...resp,
          data: formattedData,
        };
      },
    }),
    fetchAlarm: build.query<AlarmResponse, string>({
      query: (alarmId) => ({
        url: `api/alarm/info/${alarmId}`,
      }),
      providesTags: [Tag.Alarm],
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
      transformResponse: transformApiAlarm,
    }),
    fetchAlarmsCount: build.query<number, AlarmCountRequestBody>({
      query: (body) => ({
        url: "/api/alarmsQuery/count",
        method: "POST",
        body,
      }),
      providesTags: [Tag.Alarm],
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
      NotificationsQueryParams | void
    >({
      query: (
        params: NotificationsQueryParams = { pageSize: 100, page: 0 }
      ) => ({
        url: "api/notifications",
        params,
      }),
      providesTags: [Tag.Notification],
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
          return transformApiNotificiation(item);
        });

        return {
          ...resp,
          data: formattedData,
        };
      },
    }),
    logIn: build.mutation<SessionTokenResponse, SessionTokenBody>({
      query: (body) => ({
        url: "api/auth/login",
        method: "POST",
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
    acknowledgAlarm: build.mutation<AcknowledgeAlarmResponse, string>({
      query: (alarmId) => ({
        url: `/api/alarm/${alarmId}/ack`,
        method: "POST",
      }),
      invalidatesTags: [Tag.Alarm, Tag.Notification],
      onQueryStarted: async (body, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
      transformResponse: transformApiAlarm,
    }),
    readNotification: build.mutation<void, string>({
      query: (notificationId) => ({
        url: `/api/notification/${notificationId}/read`,
        method: "PUT",
      }),
      invalidatesTags: [Tag.Notification],
      onQueryStarted: async (body, { queryFulfilled }) => {
        try {
          await queryFulfilled;
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
      transformResponse: (
        resp: PaginatedResponse<ApiDevice>
      ): PaginatedResponse<Device> => {
        const formattedData = resp.data.map((item) => {
          return transformApiDevice(item);
        });

        return {
          ...resp,
          data: formattedData,
        };
      },
    }),
    fetchEntities: build.query<EntitiesResponse, EntityQueryParams>({
      query: ({ customerId, pageSize = 100, page = 0, ...params }) => ({
        url: `/api/customer/${customerId}/assets`,
        params: { pageSize, page, ...params },
      }),
      providesTags: [Tag.Entity],
      onQueryStarted: async (params, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
      transformResponse: (
        resp: PaginatedResponse<ApiEntity>
      ): PaginatedResponse<Entity> => {
        const formattedData = resp.data.map((item) => {
          return transformApiEntity(item);
        });

        return {
          ...resp,
          data: formattedData,
        };
      },
    }),
  }),
});

export const {
  useFetchAlarmQuery,
  useFetchAlarmsQuery,
  useFetchAlarmsCountQuery,
  useReadNotificationMutation,
  useAcknowledgAlarmMutation,
  useFetchNotificationsQuery,
  useFetchUserProfileQuery,
  useFetchDevicesQuery,
  useFetchEntitiesQuery,
  useLogInMutation,
} = api;

export default api;
