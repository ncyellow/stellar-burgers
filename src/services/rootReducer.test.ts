import { initialState as ingredientsReducerState } from './ingredients/slice';
import { initialState as constructorReducerState } from './constructor/slice';
import { initialState as usersReducerState } from './auth/slice';
import { initialState as ordersReducerState } from './order/slice';
import { initialState as orderBuilderReducerState } from './orderBuilder/slice';
import { initialState as feedsReducerState } from './feeds/slice';
import { rootReducer } from './rootReducer';

// генерируем состояние для всех редьюсеров по умолчанию
const testState = {
  burgerConstructor: constructorReducerState,
  feeds: feedsReducerState,
  ingredients: ingredientsReducerState,
  orderBuilder: orderBuilderReducerState,
  orders: ordersReducerState,
  users: usersReducerState
};

describe('проверка rootReducer', () => {
  test('Проверяем состояние state после кривого action', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(testState);
  });
});
