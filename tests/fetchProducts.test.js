require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts should be a function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  test('fetchProducts has to be called with argument "computador"', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('fetchProducts has to use the correct endpoint with the argument "computador"', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  test('fetchProducts has to return a object with the same structure of computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  test('fetchProducts has to return an error if the argument is not provided', async () => {
    expect.assertions('1');
    expect(await fetchProducts()).toEqual(new Error('You must provide an URL'));
  });
});

