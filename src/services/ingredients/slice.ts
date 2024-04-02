import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredientsState } from './types';

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => {
    const result = await getIngredientsApi();
    return result;
  }
);

const initialState: TIngredientsState = {
  ingredients: [],
  loading: true,
  error: null
};

export const ingredients = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.ingredients = action.payload;
        }
      });
  }
});

export const ingredientsReducer = ingredients.reducer;
