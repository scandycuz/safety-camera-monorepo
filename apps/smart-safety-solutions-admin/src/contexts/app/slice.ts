import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';

export const initialAppState: AppState = {
  isAlertsSheetOpen: false,
};

const appSlice = createSlice({
  initialState: initialAppState,
  name: 'app',
  reducers: {
    setisAlertsSheetOpen: (state, { payload }: PayloadAction<boolean>) => {
      console.log('payload: ', payload);
      state.isAlertsSheetOpen = payload;
    },
  },
});

export const { setisAlertsSheetOpen } = appSlice.actions;

export default appSlice.reducer;
