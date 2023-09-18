// 1
const buttons = document.querySelectorAll('button');

// 8
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.you-choice');
const winner = document.querySelector('.result');

// 4
const result = ['가위', '바위', '보'];

// 9
const show = (user, computer, result) => {
  computerChoice.innerText = computer;
  userChoice.innerText = user;
  winner.innerText = result;
};

// 7
const game = (user, computer) => {
  let message;

  if (user === computer) {
    message = '무승부';
  } else {
    switch (user + computer) {
      case '가위보':
      case '바위가위':
      case '보바위':
        message = '사용자 승리';
        break;

      case '가위바위':
      case '바위보':
      case '보가위':
        message = '컴퓨터 승리';
        break;
    }
  }

  show(user, computer, message);
};

// 3
const play = (event) => {
  // 6
  const user = event.target.innerText;

  // 5
  const randomIndex = Math.floor(Math.random() * 3); //1~2사이의 랜덤 수
  const computer = result[randomIndex]; //result의 배열의 인덱스
  console.log(computer);
  game(user, computer);
};

// 2
buttons.forEach((button) => {
  button.addEventListener('click', play);
  console.log(buttons);
});
