const hour = document.querySelector('.hour');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');

function clock() {
  const now = new Date();

  hour.innerText = now.getHours().toString().padStart(2, '0');
  min.innerText = now.getMinutes().toString().padStart(2, '0');
  sec.innerText = now.getSeconds().toString().padStart(2, '0');
}

setInterval(clock, 1000);
