const fetchItem = async (itemID) => {
    try {
      if (!itemID) throw new Error('You must provide an URL');
  
      const URL = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
  
      const itemData = await URL.json();
  
      return itemData;
    } catch (error) {
      return error;
    }
  };
  
  if (typeof module !== 'undefined') {
    module.exports = {
      fetchItem,
    };
  }