import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrders } from './actions';

export type TOrdersState = {
  orders: TOrder[];
};

const initialState: TOrdersState = {
  orders: []
};

export const orders = createSlice({
  name: 'orders',
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
  reducers: {}
});

export const ordersReducer = orders.reducer;
