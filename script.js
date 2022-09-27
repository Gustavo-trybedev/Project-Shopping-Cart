const itemClass = '.cart__items';
const container = document.querySelector('.container');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const saveCartInLocalStorage = () => {
  const eachCartItem = document.querySelectorAll('.cart__item');
  const allCartItemsInArray = Array.from(eachCartItem, (item) => item.innerText);
  localStorage.setItem('cartItems', JSON.stringify(allCartItemsInArray));
};

const calculatePrice = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  const cartItemsArray = Array.from(cartItems, (item) => item.innerText);
  const totalPrice = cartItemsArray.reduce((acc, curr) => {
    const price = curr.split('|')[2].split(':')[1].trim().replace('$', '');
    return acc + parseFloat(price);
  }, 0);
  return Math.trunc(totalPrice * 100) / 100;
};

const renderTotalPrice = () => {
  const totalPrice = calculatePrice();
  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.innerHTML = totalPrice;
};

const showInstallment = () => {
  const installment = document.querySelector('.installment');
  const result = calculatePrice() / 12;
  installment.innerHTML = `<b>Parcele em até 12x sem juros de <br>R$ ${result
    .toFixed(2)} com o TrybeCard!</b>`;
    installment.style.margin = '10px';
};

const cartItemClickListener = (event) => {
  event.target.remove();
  window.alert('Produto removido do carrinho!');
  renderTotalPrice();
  showInstallment();
  saveCartInLocalStorage();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addLoading = () => { 
  const loading = document.createElement('span');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  container.appendChild(loading);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

const renderProductsOnPage = async () => {
  const productList = document.querySelector('.items');
  const computerData = await fetchProducts('computador');
  const { results } = computerData;
  results.forEach(({ id, title, thumbnail }) => {
    const obj = { sku: id, name: title, image: thumbnail };
    productList.appendChild(createProductItemElement(obj));
  });
  removeLoading();
};

const renderCartItemsFromLocalStorage = () => {
  const cartItemsArray = JSON.parse(localStorage.getItem('cartItems'));
  const cart = document.querySelector(itemClass);
  if (cartItemsArray === null || cartItemsArray.length === 0) {
    return false;
  }
  cartItemsArray.forEach((item) => {
    obj = {
      sku: `${item.split('|')[0].split(':')[1].trim()}`,
      name: `${item.split('|')[1].split(':')[1].trim()}`,
      salePrice: `${item.split('|')[2].split(':')[1].trim().replace('$', '')}`,
    };
    cart.appendChild(createCartItemElement(obj));
  });
};

const getProductToAddToCart = async (item) => {
  const cart = document.querySelector(itemClass);
  const itemID = getSkuFromProductItem(item.target.parentElement);
  const { id: sku, title: name, price: salePrice } = await fetchItem(itemID);
  cart.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartInLocalStorage();
  renderTotalPrice();
  showInstallment();
  window.alert('Produto adicionado ao carrinho!');
};

const fillTheCartEvent = async () => {
  await renderProductsOnPage();
  const addButton = document.querySelectorAll('.item__add');
  addButton.forEach((button) => {
    button.addEventListener('click', getProductToAddToCart);
  });
};

const emptyCartEvent = () => {
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    const cart = document.querySelector('.cart__items');
    cart.innerHTML = '';
    saveCartInLocalStorage();
    renderTotalPrice();
    window.alert('Você esvaziou seu carrinho :(');
    showInstallment();
  });
};
emptyCartEvent();

window.onload = () => {
  addLoading();
  fillTheCartEvent();
  renderCartItemsFromLocalStorage();
  renderTotalPrice();
  showInstallment();
};
