// import products from '../products.json' assert { type: 'json' };
import products from '../products.js';

const button = document.querySelector('button');
const select = document.querySelector('select');

let myProducts;

const selectCategory = (event) => {
  if (myProducts) {
    const { selectedIndex } = event.target.options;
    const { value } = event.target.options[selectedIndex];

    const filtered = myProducts.filter((product) => {
      return product.category === value;
    });

    removeItems();
    filtered.forEach((product) => {
      createItem(product);
    });
  }
};

const removeItems = () => {
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    item.remove();
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
  if (products) {
    select.selectedIndex = 0;
    myProducts = products.data;
    myProducts.map((product) => {
      if (!document.getElementById(product.id)) {
        createItem(product);
      }
    });
  }
};

button.addEventListener('click', importData);
select.addEventListener('change', selectCategory);
