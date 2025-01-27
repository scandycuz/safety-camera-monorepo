import {
  setisAlertsSheetOpen as setIsAlertsSheetOpenAction,
  setSelectedAlert as setSelectedAlertAction,
} from "./slice";
import store from "./store";

export const setisAlertsSheetOpen = (isOpen: boolean): void => {
  store.dispatch(setIsAlertsSheetOpenAction(isOpen));
};

export const setSelectedAlert = (alertId: string): void => {
  store.dispatch(setSelectedAlertAction(alertId));
};
