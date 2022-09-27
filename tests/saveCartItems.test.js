const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  it('should be a function', () => {
    expect.assertions(1);
    expect(typeof saveCartItems).toBe('function');
  });

  it('should call localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should call localStorage.setItem with two arguments, the first one being "cartItems" and the second one being the value passed as argument to saveCartItems', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
