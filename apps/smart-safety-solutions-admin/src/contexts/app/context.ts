"use client";
import { createContext } from "react";
import { initialAppState } from "./slice";
import { setisAlertsSheetOpen, setSelectedAlert } from "./utils";

const initialContext = {
  state: initialAppState,
  setisAlertsSheetOpen,
  setSelectedAlert,
};

const AppContext = createContext(initialContext);

export default AppContext;
