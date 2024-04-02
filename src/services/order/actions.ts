import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const result = await getOrdersApi();
  return result;
});
