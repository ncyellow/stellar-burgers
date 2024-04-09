import { TConstructorState } from './types';
import {
  addConstructorItem,
  constructorReducer,
  removeConstructorItem,
  resetConstructor
} from './slice';
import { TIngredient } from '@utils-types';

describe('burgerConstructor tests', () => {
  const initialState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  const notEmptyState: TConstructorState = {
    constructorItems: {
      bun: {
        id: '643d69a5c3f7b9001cfa093c',
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
      ingredients: [
        {
          id: '643d69a5c3f7b9001cfa0941',
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        },
        {
          id: '643d69a5c3f7b9001cfa093e',
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
        }
      ]
    }
  };

  test('burgerConstructor resetConstructor', () => {
    // Заполняем данными и проверяем что reset все обнуляет
    const newState = constructorReducer(notEmptyState, {
      type: resetConstructor.type
    });
    expect(newState.constructorItems).toEqual(initialState.constructorItems);
  });

  test('burgerConstructor addConstructorItem', () => {
    const bunItem: TIngredient = {
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
    };

    const bunNewItem: TIngredient = {
      _id: '323d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i под замену',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const mainItem: TIngredient = {
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
    };

    let newState = constructorReducer(initialState, {
      type: addConstructorItem.type,
      payload: bunItem
    });

    // Проверяем что булка выставлена
    expect(newState.constructorItems.bun?._id).toEqual(bunItem._id);

    // Добавляем первый ингредиент
    newState = constructorReducer(newState, {
      type: addConstructorItem.type,
      payload: mainItem
    });

    // Проверяем что один ингредиент добавлен
    expect(newState.constructorItems.ingredients.length).toBe(1);

    // Добавляем второй ингредиент
    newState = constructorReducer(newState, {
      type: addConstructorItem.type,
      payload: mainItem
    });

    // Проверяем что оба ингредиента добавлены
    expect(newState.constructorItems.ingredients.length).toBe(2);

    // Добавляем другую булку и проверяем что старая ушла под замену
    newState = constructorReducer(newState, {
      type: addConstructorItem.type,
      payload: bunNewItem
    });

    // Проверяем что булка вставлена
    expect(newState.constructorItems.bun?._id).toEqual(bunNewItem._id);
  });

  test('burgerConstructor removeConstructorItem', () => {
    let newState = notEmptyState;

    // Последовательно удаляем все ингредиенты
    for (const ingr of notEmptyState.constructorItems.ingredients) {
      newState = constructorReducer(newState, {
        type: removeConstructorItem.type,
        payload: ingr
      });
    }
    expect(newState.constructorItems.ingredients.length).toBe(0);
  });
});
