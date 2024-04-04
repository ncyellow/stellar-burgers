import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const buildOrder = createAsyncThunk(
  'order/build',
  async (ingredients: string[]) => {
    const result = await orderBurgerApi(ingredients);
    return result;
  }
);
