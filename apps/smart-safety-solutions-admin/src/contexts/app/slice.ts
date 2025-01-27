import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./types";

export const initialAppState: AppState = {
  isAlertsSheetOpen: false,
  selectedAlert: "",
};

const appSlice = createSlice({
  initialState: initialAppState,
  name: "app",
  reducers: {
    setisAlertsSheetOpen: (state, { payload }: PayloadAction<boolean>) => {
      console.log("payload: ", payload);
      state.isAlertsSheetOpen = payload;
    },
    setSelectedAlert: (state, { payload }: PayloadAction<string>) => {
      console.log("payload: ", payload);
      state.selectedAlert = payload;
    },
  },
});

export const { setisAlertsSheetOpen, setSelectedAlert } = appSlice.actions;

export default appSlice.reducer;
