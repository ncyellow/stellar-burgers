import { createSelector } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getBuns = createSelector(
  (state) => state.ingredients.ingredients,
  (items: TIngredient[]) => items.filter((value) => value.type === 'bun')
);

export const getMains = createSelector(
  (state) => state.ingredients.ingredients,
  (items: TIngredient[]) => items.filter((value) => value.type === 'main')
);
export const getSauces = createSelector(
  (state) => state.ingredients.ingredients,
  (items: TIngredient[]) => items.filter((value) => value.type === 'sauce')
);
