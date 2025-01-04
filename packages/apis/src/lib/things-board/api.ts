import { createApi } from '@reduxjs/toolkit/query/react';
import {
  AlarmsQueryParams,
  AlarmsResponse,
  SessionTokenBody,
  SessionTokenResponse,
} from './types';
import { baseQueryWithReauth } from './utils';
import { receiveSession } from '@smart-safety-solutions/contexts';

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
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
    fetchAlarms: build.query<AlarmsResponse, AlarmsQueryParams | void>({
      query: (params: AlarmsQueryParams = { pageSize: 20, page: 1 }) => ({
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
  }),
});

export const { useFetchAlarmsQuery, useLogInMutation } = api;

export default api;
