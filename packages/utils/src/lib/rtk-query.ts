import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const parseRtkQueryEndpointErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  // handle FetchBaseQueryError
  if (
    error &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  ) {
    return error.data.message;
  }

  // handle Serialized Error
  if (error && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return undefined;
};
