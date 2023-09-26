const form = document.querySelector('form'); // HTML 폼 엘리먼트를 선택합니다.
const blocks = document.querySelectorAll('.list'); // 클래스가 "list"인 모든 엘리먼트를 선택합니다.

// from : 출발하는 섹션의 id값
// to : 도착하는 섹션의 id값
let from, to;

let todoList = [], // 할 일 목록을 담을 배열
  doingList = [], // 진행 중인 일 목록을 담을 배열
  doneList = []; // 완료된 일 목록을 담을 배열

const lists = {
  todo: todoList,
  doing: doingList,
  done: doneList,
};

const removeTodo = (event) => {
  event.preventDefault();

  const { id } = event.target;
  const { id: listId } = event.target.parentElement;

  event.target.remove();
  lists[listId] = lists[listId].filter((todo) => {
    return todo.id !== id;
  });

  saveList(listId);
};

const saveList = (listId) => {
  localStorage.setItem(listId, JSON.stringify(lists[listId]));
};

const dragOver = (event) => {
  event.preventDefault(); // 기본 드래그 앤 드롭 동작을 막습니다.

  const { id: targetId } = event.target; // 이벤트 대상의 id 값을 가져옵니다.
  const listIds = Object.keys(lists); // lists 객체의 키(할 일 목록, 진행 중인 일 목록, 완료된 일 목록)을 배열로 가져옵니다.

  if (listIds.includes(targetId)) {
    to = targetId; // 대상 엘리먼트의 id가 lists 객체의 키 중 하나와 일치하는 경우, 이동할 목록(to)으로 설정합니다.
  }
};

const dragEnd = (event) => {
  const { id } = event.target; // 드래그된 엘리먼트의 id 값을 가져옵니다.

  if (from === to) {
    return;
  }

  event.target.remove(); // 드래그된 엘리먼트를 화면에서 제거합니다.
  lists[from] = lists[from].filter((todo) => {
    // 출발한 목록(from)에서 해당 id를 가진 항목을 제외한 새로운 배열을 생성합니다.
    if (todo.id !== id) {
      return todo;
    } else {
      createElement(to, todo); // 새 목록(to)에 해당 항목을 추가합니다.
    }
  });
  saveList(from);
  saveList(to);
};

const dragStart = (event) => {
  from = event.target.parentElement.id; // 출발 목록(from)을 설정합니다.
  to = from;
};

const createElement = (listId, todo) => {
  const list = document.querySelector(`#${listId}`); // 목록 엘리먼트를 선택합니다.
  const item = document.createElement('div'); // 새로운 할 일 항목을 생성합니다.

  item.id = todo.id; // 엘리먼트의 id 속성을 설정합니다.
  item.innerText = todo.text; // 엘리먼트의 텍스트 내용을 설정합니다.
  item.className = 'item'; // 엘리먼트에 "item" 클래스를 추가합니다.
  item.draggable = 'true'; // 엘리먼트를 드래그 가능하게 설정합니다.

  item.addEventListener('dragstart', dragStart); // 드래그 시작 이벤트를 처리하는 리스너를 추가합니다.
  item.addEventListener('dragend', dragEnd); // 드래그 종료 이벤트를 처리하는 리스너를 추가합니다.
  item.addEventListener('contextmenu', removeTodo);

  list.append(item); // 목록에 엘리먼트를 추가합니다.
  lists[listId].push(todo); // 해당 목록 배열에 항목을 추가합니다.
};

const createTodo = (event) => {
  event.preventDefault(); // 기본 폼 제출 동작을 막습니다.

  const input = document.querySelector('input'); // 입력 필드 엘리먼트를 선택합니다.
  const id = uuidv4(); // UUID를 생성합니다.

  const newTodo = {
    id,
    text: input.value, // 입력 필드의 값으로 새로운 할 일 항목을 생성합니다.
  };

  createElement('todo', newTodo); // "todo" 목록에 새로운 할 일 항목을 추가합니다.
  input.value = ''; // 입력 필드를 초기화합니다.
  saveList('todo');
};

const loadList = () => {
  const userTodoList = JSON.parse(localStorage.getItem('todo'));
  const userDoingList = JSON.parse(localStorage.getItem('doing'));
  const userDoneList = JSON.parse(localStorage.getItem('done'));

  if (userTodoList) {
    userTodoList.forEach((todo) => {
      createElement('todo', todo);
    });
  }
  if (userDoingList) {
    userDoingList.forEach((todo) => {
      createElement('doing', todo);
    });
  }
  if (userDoneList) {
    userDoneList.forEach((todo) => {
      createElement('done', todo);
    });
  }
};

loadList();
form.addEventListener('submit', createTodo); // 폼 제출 이벤트를 처리하는 리스너를 추가합니다.
blocks.forEach((block) => {
  block.addEventListener('dragover', dragOver); // 드래그 오버 이벤트를 처리하는 리스너를 각 목록 엘리먼트에 추가합니다.
});
