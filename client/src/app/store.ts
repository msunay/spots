import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from '../features/location/locationSlice';
import counterReducer from '../features/counter/counterSlice';
import { spotsApi } from '../services/api-service';
// import { spotsApiSlice } from '../features/spotsApi/spotsApiSlice';

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
