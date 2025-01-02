import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import Cookies from 'js-cookie';
import { logOut, receiveSession } from '@smart-safety-solutions/contexts';
import { Mutex } from 'async-mutex';
import {
  SessionCookies,
  SessionTokens,
} from 'packages/contexts/src/lib/session/types';

const baseUrl = 'http://24.144.82.31:8085/';

// mutex to pause calls while refreshing session
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({ baseUrl });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  // make request
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = Cookies.get(SessionCookies.refreshToken);
        const refreshResult = await baseQuery(
          {
            url: '/api/auth/token',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );
        const refreshResultData = refreshResult.data as SessionTokens;

        if (refreshResultData as SessionTokens) {
          receiveSession(refreshResultData);

          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          logOut();
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
