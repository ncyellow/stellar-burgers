import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { buildOrder } from './actions';

type TNewOrderState = {
  order: TOrder | null;
  name: string | null;
  orderRequest: boolean;
};

const initialState: TNewOrderState = {
  order: null,
  name: null,
  orderRequest: false
};

export const orderBuilder = createSlice({
  name: 'builder',
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(buildOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(buildOrder.rejected, (state) => {
        state.orderRequest = false;
        state.order = null;
        state.name = null;
      })
      .addCase(buildOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.orderRequest = false;
      });
  },
  reducers: { resetOrder: (state) => (state = initialState) }
});

export const orderBuilderReducer = orderBuilder.reducer;
export const { resetOrder } = orderBuilder.actions;
