import { API_KEY } from './env.js';

// const createBlock = (movie) => {
//   console.log(movie.id, movie.poster_path, movie.original_title, movie.title, movie.vote_average, movie.release_date);
// };
const form = document.querySelector('form');
const removeAll = () => {
  const movies = document.querySelectorAll('.movie');

  movies.forEach((movie) => {
    movie.remove();
  });
};

const searchMovie = (event) => {
  event.preventDefault();

  const input = document.querySelector('input');
  const { value: keyword } = input;

  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${API_KEY}`;

  if (keyword) {
    removeAll();
    fetch(searchURL)
      .then((response) => response.json())
      .then(({ results }) => {
        results.forEach((movie) => {
          createBlock(movie);
        });
      });
  }
};

const movieDetail = (event) => {
  const { id } = event.target.parentElement;
  const detailURL = `https://www.themoviedb.org/movie/${id}`;
  window.open(detailURL, '_blank');
};

const createBlock = ({
  id,
  poster_path,
  original_title,
  title,
  vote_average,
  release_date,
}) => {
  const parent = document.querySelector('.contents');
  const movie = document.createElement('div');
  const poster = document.createElement('img');
  const detail = document.createElement('div');
  const info = document.createElement('div');
  const date = document.createElement('div');
  const rate = document.createElement('div');
  const h3 = document.createElement('h3');

  movie.className = 'movie';
  detail.className = 'detail';
  info.className = 'info';
  date.className = 'date';
  rate.className = 'rate';

  movie.id = id;
  poster.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
  h3.innerText = `${original_title} (${title})`;
  date.innerText = release_date;
  rate.innerText = `🌟 ${vote_average}`;

  poster.addEventListener('click', movieDetail);

  info.append(date, rate);
  detail.append(info, h3);
  movie.append(poster, detail);
  parent.append(movie);

  /*
     <div class="movie">
            <img src="" alt="" />
            <div class="detail">
              <div class="info">
                <div class="date">release_date</div>
                <div class="rate">vote_average</div>
              </div>
              <h3>original_title (title)</h3>
            </div>
          </div> 
     */
};

const getPopularMovies = () => {
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

  fetch(URL)
    .then((response) => response.json())
    .then(({ results }) => {
      results.forEach((movie) => {
        createBlock(movie);
      });
    })
    .catch((err) => console.error(err));
};

getPopularMovies();
form.addEventListener('submit', searchMovie);
