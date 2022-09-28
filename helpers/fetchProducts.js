const fetchProducts = async (product) => {
    try {
      if (!product) throw new Error('You must provide an URL');
  
      const URL = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  
      const productData = await URL.json();
  
      return productData;
    } catch (error) {
      return error;
    }
  };
  
  if (typeof module !== 'undefined') {
    module.exports = {
      fetchProducts,
    };
  }