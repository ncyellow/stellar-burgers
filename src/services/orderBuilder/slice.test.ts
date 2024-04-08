import { TNewOrderState, initialState, orderBuilderReducer } from './slice';
import { buildOrder } from './actions';
import { TNewOrderResponse } from '@api';

describe('orderBuilder tests', () => {
  const testData: TNewOrderResponse = {
    success: true,
    name: 'Флюоресцентный метеоритный бургер',
    order: {
      ingredients: [],
      _id: '6612af2997ede0001d064aab',
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-04-07T14:35:21.487Z',
      updatedAt: '2024-04-07T14:35:22.139Z',
      number: 37801
    }
  };

  test('orderBuilder pending', () => {
    const newState = orderBuilderReducer(initialState, {
      type: buildOrder.pending.type,
      payload: testData
    });
    expect(newState.orderRequest).toEqual(true);
    expect(newState.name).toEqual(null);
    expect(newState.order).toEqual(null);
  });

  test('orderBuilder rejected', () => {
    const newState = orderBuilderReducer(initialState, {
      type: buildOrder.rejected.type,
      payload: testData
    });
    expect(newState.orderRequest).toEqual(false);
    expect(newState.name).toEqual(null);
    expect(newState.order).toEqual(null);
  });

  test('orderBuilder fulfilled', () => {
    const newState = orderBuilderReducer(initialState, {
      type: buildOrder.fulfilled.type,
      payload: testData
    });
    expect(newState.orderRequest).toEqual(false);
    expect(newState.name).toEqual(testData.name);
    expect(newState.order).toEqual(testData.order);
  });
});
