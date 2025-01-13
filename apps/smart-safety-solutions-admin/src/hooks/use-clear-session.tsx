import { SessionContext } from '@smart-safety-solutions/contexts';
import api from 'packages/apis/src/lib/things-board/api';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useClearSession = () => {
  const dispatch = useDispatch();

  const {
    state: { isLoggedIn },
  } = useContext(SessionContext);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('clearing session');
      dispatch(api.util.resetApiState());
    }
  }, [dispatch, isLoggedIn]);
};
