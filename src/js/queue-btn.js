import Notiflix from 'notiflix';
import { renderCard } from './renderCard';
import { onEmptyMoviesStorage } from './watched-btn';

const queueBtn = document.querySelector('button[data-action="queue"]');
const watchedBtn = document?.querySelector('button[data-action="watched"]');
const mainSection = document.querySelector('.card__list');
const queueMovies = JSON.parse(localStorage.getItem('Queque:'));
const clearBtn = document.querySelector('.clear-btn');
const loader = document.querySelector('.loader__wrapper');

queueBtn?.addEventListener('click', onQueueBtnClick);
clearBtn?.addEventListener('click', onClearBtnClick);

export function onQueueBtnClick() {
  loader.classList.remove('hidden');
  watchedBtn.classList.remove('current-btn');
  queueBtn.classList.add('current-btn');
  clearBtn.classList.add('clear-btn--visible');
 //localStorage.setItem('last-active-btn', 'queueButton');

  if (queueMovies === null || queueMovies.length === 0) {
    clearBtn.classList.remove('clear-btn--visible');
    clearBtn.classList.add('clear-btn');
    onEmptyMoviesStorage();
    loader.classList.add('hidden');
    return Notiflix.Notify.failure('You need to add at least 1 movie.', {
      timeout: 1500,
      clickToClose: true,
    });
  }

  mainSection.innerHTML = '';

  renderQueueCard();
  loader.classList.add('hidden');
}

queueBtn?.addEventListener('click', onQueueBtnClick);

export function renderQueueCard() {
  const queueList = queueMovies.map(film => {
    const genres = film.genres.map(genre => genre.name);

    renderCard(
      film.id,
      film.poster_path,
      film.title,
      film.name,
      genres,
      film.first_air_date,
      film.release_date,
      film.vote_average
    );
  });
}

function onClearBtnClick() {
  if (queueBtn.classList.contains('current-btn')) {
    localStorage.removeItem('Queque:');
    location.reload();
  }
}
