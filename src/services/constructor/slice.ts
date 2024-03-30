import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorState } from './types';

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: (state, action) => {
      const type = action.payload.type;

      if (type === 'bun') {
        state.constructorItems.bun = { ...action.payload, id: uuidv4() };
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: uuidv4()
        });
      }
    },
    removeConstructorItem: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (el) => el.id !== action.payload
        );
    },
    clearConstructor: (state) => (state = initialState)
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const constructorReducer = burgerConstructor.reducer;
export const { getConstructorSelector } = burgerConstructor.selectors;
export const { addConstructorItem, removeConstructorItem, clearConstructor } =
  burgerConstructor.actions;
