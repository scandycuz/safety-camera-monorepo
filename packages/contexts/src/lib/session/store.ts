import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slice';

const store = configureStore({
  reducer: { session: sessionReducer },
});

export default store;
