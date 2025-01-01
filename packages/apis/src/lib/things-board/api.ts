import { createApi } from '@reduxjs/toolkit/query/react';
import { SessionTokenBody, SessionTokenResponse } from './types';
import { baseQueryWithReauth } from './utils';
import { receiveTokens } from '@smart-safety-solutions/contexts';

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
          receiveTokens(resp.data);
        } catch (err) {
          console.log(err);
          // TODO: set error toast message
        }
      },
    }),
  }),
});

export const { useLogInMutation } = api;

export default api;
