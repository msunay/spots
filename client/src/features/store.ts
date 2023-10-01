import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from './location/locationSlice';
import counterReducer from './counter/counterSlice';
import { spotsApi } from '../services/api-service';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    counter: counterReducer,
    [spotsApi.reducerPath]: spotsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(spotsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
