import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
  const result = await getFeedsApi();
  return result;
});
