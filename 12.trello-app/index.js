const form = document.querySelector('form');

const createElement = (listId, todo) => {
  const list = document.querySelector(`#${listId}`);
  const item = document.createElement('div');

  item.id = todo.id;
  item.innerText = todo.text;
  item.className = 'item';
  item.draggable = true;

  list.append(item);
};

const createTodo = (event) => {
  event.preventDefault();

  const input = document.querySelector('input');
  const id = uuidv4();

  // UUID

  const newTodo = {
    id,
    text: input.value,
  };

  createElement('todo', newTodo);
  input.value = '';
};

form.addEventListener('submit', createTodo);
