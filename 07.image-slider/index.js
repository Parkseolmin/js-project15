const images = document.querySelectorAll('.item');
const preButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;
let lastIndex = images.length - 1; // 3개 -0, 1, 2

const updateImage = () => {
  images.forEach((image) => {
    image.classList.remove('show');
  });

  images[index].classList.add('show');
};

const moveToPrev = () => {
  if (index === 0) {
    index = lastIndex;
  } else {
    index--;
  }

  updateImage();
};

const moveToNext = () => {
  if (index === lastIndex) {
    index = 0;
  } else {
    index++;
  }

  updateImage();
};

preButton.addEventListener('click', moveToPrev);
nextButton.addEventListener('click', moveToNext);
