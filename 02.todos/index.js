const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const btn = document.querySelector('button');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input.value !== '') {
    const li = document.createElement('li');
    li.innerText = input.value;
    ul.appendChild(li);

    input.value = '';
  }
});
