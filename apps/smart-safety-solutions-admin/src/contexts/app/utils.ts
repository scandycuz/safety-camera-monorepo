import { setisAlertsSheetOpen as setIsAlertsSheetOpenAction } from './slice';
import store from './store';

export const setisAlertsSheetOpen = (isOpen: boolean): void => {
  store.dispatch(setIsAlertsSheetOpenAction(isOpen));
};
