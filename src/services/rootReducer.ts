import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredients/slice';
import { constructorReducer } from './constructor/slice';
import { usersReducer } from './auth/slice';
import { ordersReducer } from './order/slice';
import { orderBuilderReducer } from './orderBuilder/slice';
import { feedsReducer } from './feeds/slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  users: usersReducer,
  orders: ordersReducer,
  feeds: feedsReducer,
  orderBuilder: orderBuilderReducer
});
