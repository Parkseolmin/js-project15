// import products from '../products.json' assert { type: 'json' };
import products from '../products.js';
const button = document.querySelector('button');
const ascButton = document.querySelector('.ascending');
const descButton = document.querySelector('.descending');

const removeItems = () => {
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    item.remove();
  });
};

const sortAsc = () => {
  const myProduct = products.data.sort((a, b) => {
    return a.price - b.price;
  });
  removeItems();
  myProduct.forEach((product) => {
    createItem(product);
  });
};

const sortDesc = () => {
  const myProduct = products.data.sort((a, b) => {
    return b.price - a.price;
  });
  removeItems();
  myProduct.forEach((product) => {
    createItem(product);
  });
};

const createItem = (product) => {
  /**
   * <li id="1">
   *  <h3 class="name">Title</h3>
   *  <div class="price">15,000원</div>
   * </li>
   */
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');

  const price = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(product.price);

  li.id = product.id;
  h3.className = 'name';
  h3.innerText = product.name;
  div.className = 'price';
  div.innerText = price;

  li.append(h3, div);
  ul.append(li);
};

const importData = () => {
  products.data.map((product) => {
    if (!document.getElementById(product.id)) {
      createItem(product);
    }
  });
};

button.addEventListener('click', importData);
ascButton.addEventListener('click', sortAsc);
descButton.addEventListener('click', sortDesc);
