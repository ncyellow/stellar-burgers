import { getIngredients, ingredientsReducer, initialState } from './slice';
import { TIngredient } from '@utils-types';

describe('ingredients tests', () => {
  const testData: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  test('ingredients pending', () => {
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.pending.type,
      payload: testData
    });
    expect(newState.error).toEqual(null);
    expect(newState.loading).toEqual(true);
    expect(newState.ingredients).toEqual([]);
  });

  test('ingredients rejected', () => {
    const messageError = 'error';
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.rejected.type,
      error: {
        message: messageError
      },
      payload: null
    });
    expect(newState.error).toEqual(messageError);
  });

  test('ingredients fulfilled', () => {
    const newState = ingredientsReducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: testData
    });
    expect(newState.error).toEqual(null);
    expect(newState.loading).toEqual(false);
    expect(newState.ingredients).toEqual(testData);
  });
});
