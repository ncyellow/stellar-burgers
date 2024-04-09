import { TOrder } from '@utils-types';
import { TOrdersState, initialState, ordersReducer } from './slice';
import { getOrders } from './actions';

describe('orders tests', () => {
  test('getOrders', () => {
    const testData: TOrder[] = [
      {
        _id: '66117b8497ede0001d06495a',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0949',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Экзо-плантаго флюоресцентный био-марсианский антарианский бургер',
        createdAt: '2024-04-06T16:42:44.743Z',
        updatedAt: '2024-04-06T16:42:45.374Z',
        number: 37785
      },
      {
        _id: '6611758297ede0001d06494d',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Астероидный краторный бессмертный альфа-сахаридный традиционный-галактический био-марсианский бургер',
        createdAt: '2024-04-06T16:17:06.544Z',
        updatedAt: '2024-04-06T16:17:07.144Z',
        number: 37784
      },
      {
        _id: '6611753097ede0001d06494c',
        ingredients: [
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-04-06T16:15:44.512Z',
        updatedAt: '2024-04-06T16:15:45.051Z',
        number: 37783
      }
    ];

    // У нас на старте пусто. нет заказов
    const newState = ordersReducer(initialState, {
      type: getOrders.fulfilled.type,
      payload: testData
    });
    // Проверяем что при работе getOrders.fulfilled у нас заполняются заказы
    expect(newState.orders).toEqual(testData);
  });
});
