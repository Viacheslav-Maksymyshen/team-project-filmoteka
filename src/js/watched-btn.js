import Notiflix from 'notiflix';
import { renderCard } from './renderCard';
import { onQueueBtnClick } from './queue-btn';

const watchedBtn = document.querySelector('button[data-action="watched"]');
const queueBtn = document.querySelector('button[data-action="queue"]');
const mainSection = document.querySelector('.card__list');
const watchedMovies = JSON.parse(localStorage.getItem('Watched:'));
const clearBtn = document.querySelector('.clear-btn');
const loader = document.querySelector('.loader__wrapper');

watchedBtn?.addEventListener('click', onWatchBtnClick);
clearBtn?.addEventListener('click', onClearBtnClick);

firstBtnActive();

function firstBtnActive() {
  if (localStorage.getItem('last-active-btn') === 'watchedButton') {
    return onWatchBtnClick()
  }

  if (localStorage.getItem('last-active-btn') === 'queueButton') {
    return onQueueBtnClick()
  } else {
    onWatchBtnClick();
  }
}

function onWatchBtnClick() {
  loader.classList.remove('hidden');
  watchedBtn.classList.add('current-btn');
  queueBtn.classList.remove('current-btn');
  clearBtn.classList.add('clear-btn--visible');
  localStorage.setItem('last-active-btn', 'watchedButton');

  if (watchedMovies === null || watchedBtn.length === 0) {
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

  renderWatchedCard();
  loader.classList.add('hidden');
}

export function renderWatchedCard() {
  const watchedL = watchedMovies.map(film => {
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

export function onEmptyMoviesStorage() {
  const notificationText = `<li class="card__notification">You don't have any movies added</li>`;
  mainSection.innerHTML = notificationText;
}

function onClearBtnClick() {
  if (watchedBtn.classList.contains('current-btn')) {
    localStorage.removeItem('Watched:');
    location.reload();
  }
}
