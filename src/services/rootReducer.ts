import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredients/slice';
import { constructorReducer } from './constructor/slice';
import { usersReducer } from './auth/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  users: usersReducer
});
