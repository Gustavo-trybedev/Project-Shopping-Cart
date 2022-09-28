const getSavedCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems;
  };
  
  if (typeof module !== 'undefined') {
    module.exports = getSavedCartItems;
  }