require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('fetchItem should be a function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  test('fetchItem has to be called with argument "MLB1615760527"', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('fetchItem has to use the correct endpoint with the argument "MLB1615760527"', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('fetchItem has to return a object with the same structure of item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  test('fetchItem has to return an error if the argument is not provided', async () => {
    expect.assertions('1');
    expect(await fetchItem()).toEqual(new Error('You must provide an URL'));
  });
});
