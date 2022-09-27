const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('should be a function', () => {
    expect(typeof getSavedCartItems).toBe('function');
  });
  test('if getSavedCartItems use the method localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  test('if getSavedCartItems use the method localStorage.getItem with the argument "cartItems"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});
