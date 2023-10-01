import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { coords } from '../../Types';

const initialState: coords = {
  lat: 51.50801934581279,
  lng: -0.08776463605191384,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<coords>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { updateLocation } = locationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLocation = (state: RootState) => state.location;

export default locationSlice.reducer;
