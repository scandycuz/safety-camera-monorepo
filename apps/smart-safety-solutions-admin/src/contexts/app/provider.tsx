"use client";
import AppContext from "./context";
import { FunctionComponent } from "react";
import { setisAlertsSheetOpen, setSelectedAlert } from "./utils";
import store from "./store";
import { Provider, useSelector } from "react-redux";

interface AppProviderProps {
  readonly children: JSX.Element;
}

type RootState = ReturnType<typeof store.getState>;

const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
  const state = useSelector((state: RootState) => state.app);

  return (
    <AppContext.Provider
      value={{ state, setisAlertsSheetOpen, setSelectedAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};

const WrappedAppProvider: FunctionComponent<AppProviderProps> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <AppProvider>{children}</AppProvider>
    </Provider>
  );
};

export default WrappedAppProvider;
