import products from '../products.js';

let myProducts;
let selected = [];

const updateTotal = (price) => {
  const span = document.querySelector('.total-price');

  const formatted = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);

  span.innerText = formatted;
};

const calculate = () => {
  const reducer = (acc, current) => acc + current.price;
  const result = selected.reduce(reducer, 0);
  updateTotal(result);
};

const addChart = (event) => {
  const { checked } = event.target;
  const { id } = event.target.parentElement;

  if (checked) {
    myProducts.forEach((product) => {
      if (product.id === parseInt(id)) {
        selected.push(product);
      }
    });
  } else {
    selected = selected.filter((product) => {
      return product.id !== parseInt(id);
    });
  }

  calculate();
};

const createItem = (product) => {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');
  const check = document.createElement('input');

  li.id = product.id;
  h3.className = 'name';
  h3.innerText = product.name;

  const price = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(product.price);

  div.className = 'price';
  div.innerText = price;

  check.setAttribute('type', 'checkbox');
  check.addEventListener('change', addChart);

  li.append(check, h3, div);
  ul.append(li);
};

const importData = () => {
  if (products) {
    myProducts = products.data;
  }

  myProducts.map((product) => {
    if (!document.getElementById(product.id)) {
      createItem(product);
    }
  });
};

importData();
