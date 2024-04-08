const ENDPOINT = 'http://localhost:4000';

describe('набор e2e тестов', function () {
  // Перед каждым тестом устанавливаем перехват и куки чтобы изобразить видимость авторизации
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'getIngredients'}`);
  });

  it('проверка добавления ингредиентов в конструктор', () => {
    cy.visit(ENDPOINT);
    // Достаем хлеб
    const bun = cy
      .get(`[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]`)
      .contains('Добавить');
    // Достаем начинку
    const main = cy
      .get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить');

    // Проверяем что до клика у нас дефолтный набор полей
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');

    bun.click();
    main.click();

    // После кликов они изменились
    cy.get('div').contains('Выберите булки').should('not.exist');
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });

  it('оформление заказа', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'orders.json'
    }).as(`${'buildOrder'}`);

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as(`${'checkUserAuth'}`);

    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testToken');
    localStorage.setItem('accessToken', 'testToken');

    cy.visit(ENDPOINT);

    // Достаем хлеб
    const bun = cy
      .get(`[data-cy="ingredient-643d69a5c3f7b9001cfa093d"]`)
      .contains('Добавить');
    // Достаем начинку
    const main = cy
      .get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .contains('Добавить');

    bun.click();
    main.click();

    const orderButton = cy.contains('Оформить заказ');
    orderButton.click();

    // Проверяем что у нас есть компонент с номером заказа
    cy.contains('37843');

    // жмем крестик
    const modalCloseBtn = cy.get(`[data-cy="modal-close"]`);
    modalCloseBtn.click();

    // Проверяем что заказ пропал + поля заказа обнулились
    cy.contains('37843').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });

  it('модальное окно ингредиента', () => {
    cy.visit(ENDPOINT);
    let ingredient = cy.contains('Мясо бессмертных моллюсков Protostomia');
    ingredient.should('exist');
    ingredient.click();

    const calories = cy.get(`[data-cy="calories"]`);
    calories.should('have.text', '420');

    const proteins = cy.get(`[data-cy="proteins"]`);
    proteins.should('have.text', '433');

    const fat = cy.get(`[data-cy="fat"]`);
    fat.should('have.text', '244');

    const carbohydrates = cy.get(`[data-cy="carbohydrates"]`);
    carbohydrates.should('have.text', '33');

    const modalCloseBtn = cy.get(`[data-cy="modal-close"]`);
    modalCloseBtn.click();

    ingredient.should('not.exist');
  });
});
