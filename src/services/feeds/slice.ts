import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeeds } from './actions';

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feeds = createSlice({
  name: 'feeds',
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  },
  reducers: {}
});

export const feedsReducer = feeds.reducer;
