import FilmsAPI from './apiServiсe';
import { renderMovieModal } from './renderPopupCard';
const trendingFilms = new FilmsAPI();
const filmCard = document.querySelector('.section');
filmCard.addEventListener('click', onFilmCardClick);

// const storage refs
const STORAGE_WATCHED = 'Watched:';
const STORAGE_QUEUE = 'Queque:';

async function fetchFilmData(filmID) {
  const response = await trendingFilms.getFilmID(filmID);
  return response.data;
}

function onFilmCardClick(e) {
  e.preventDefault();
  if (
    e.target.closest('.card__link')?.querySelector('.card__poster') ===
    undefined
  ) {
    return;
  }

  fetchFilmData(e.target.closest('.card__link').id).then(film => {
    // pop up fetched movie id
    let parentId = e.target.closest('.card__link').id;

    //this refs should be there to get active parsed arrays
    const watchedFilmsArray =
      JSON.parse(localStorage.getItem(STORAGE_WATCHED)) || [];
    const queueFilmsArray =
      JSON.parse(localStorage.getItem(STORAGE_QUEUE)) || [];

    // refs for building labels in first popup buttons loading
    let isInWatchedBefore;
    let isInQueueBefore;

    // find if movie is in isInWatchedBefore
    watchedFilmsArray.find(value => {
      if (value.id == parentId) {
        return (isInWatchedBefore = true);
      } else {
        return (isInWatchedBefore = false);
      }
    });

    // find if movie is in isInWatchedBefore
    queueFilmsArray.find(value => {
      if (value.id == parentId) {
        return (isInQueueBefore = true);
      } else {
        return (isInQueueBefore = false);
      }
    });

    // popup first loading buttons labels
    let watchBtnLabel = '';
    let queueBtnLabel = '';

    //build add or delete to watch label
    if (isInWatchedBefore) {
      watchBtnLabel = 'Remove from watched';
    } else {
      watchBtnLabel = 'Add to watched';
    }

    //build add or delete to queue label
    if (isInQueueBefore) {
      queueBtnLabel = 'Remove from queue';
    } else {
      queueBtnLabel = 'Add to queue';
    }

    // BUTTONS MAIN LOGIC !!!
    document.addEventListener('click', e => {
      // logic for button "add to watch"
      if (
        e.target.classList.contains('watched-button') &&
        e.target.getAttribute('data-id') === parentId
      ) {
        let isInWatched;

        //find if there is popup movie in watchedFilmsArray
        watchedFilmsArray.find(value => {
          if (value.id == parentId) {
            return (isInWatched = true);
          } else {
            return (isInWatched = false);
          }
        });

        // logic to delete movie if this movie is in watchedFilmsArray
        if (isInWatched) {
          const indexWatchMovieRemove = watchedFilmsArray.findIndex(movie => {
            return movie.id == parentId;
          });
          watchedFilmsArray.splice(indexWatchMovieRemove, 1);
          localStorage.setItem(
            STORAGE_WATCHED,
            JSON.stringify(watchedFilmsArray)
          );
          isInWatched = false;
          e.target.innerText = 'Add to watched';
          // console.log('removed from watched ');
          return;
        }

        // logic to add movie if this movie is not in watchedFilmsArray
        else {
          watchedFilmsArray.push(film);
          localStorage.setItem(
            STORAGE_WATCHED,
            JSON.stringify(watchedFilmsArray)
          );
          isInWatched = true;
          e.target.innerText = 'Remove to watched';
          // console.log("add to watched ");
          return;
        }
      }

      // logic for button "add to queue"
      if (
        e.target.classList.contains('queque-button') &&
        e.target.getAttribute('data-id') === parentId
      ) {
        let isInQueue;

        //find if there is popup movie in queueFilmsArray
        queueFilmsArray.find(value => {
          if (value.id == parentId) {
            return (isInQueue = true);
          } else {
            return (isInQueue = false);
          }
        });

        // logic to delete movie if this movie is in queueFilmsArray
        if (isInQueue) {
          const indexQueueMovieRemove = queueFilmsArray.findIndex(movie => {
            return movie.id == parentId;
          });
          queueFilmsArray.splice(indexQueueMovieRemove, 1);
          localStorage.setItem(STORAGE_QUEUE, JSON.stringify(queueFilmsArray));
          isInQueue = false;
          e.target.innerText = 'Add to queue';
          // console.log('removed from queue');
          return;
        }
        // logic to add movie if this movie is not in queueFilmsArray
        else {
          queueFilmsArray.push(film);
          localStorage.setItem(STORAGE_QUEUE, JSON.stringify(queueFilmsArray));
          isInQueue = true;
          e.target.innerText = 'Remove from queue';
          // console.log("add to queue ");
          return;
        }
      }
    });

    // popup render
    const {
      title,
      name,
      poster_path,
      id,
      vote_average,
      vote_count,
      popularity,
      overview,
      genres,
    } = film;
    const genre = [];
    if (genres.length === 0) {
      genre.push('Unknown');
    } else {
      genres.forEach(res => genre.push(res.name));
    }
    try {
      setTimeout(() => {
        renderMovieModal(
          title,
          name,
          poster_path,
          id,
          vote_average,
          vote_count,
          popularity,
          overview,
          genre,
          watchBtnLabel,
          queueBtnLabel
        );
      }, 100);
    } catch (error) {
      console.log('error');
    }
  });
}

const modalRef = document.querySelector('.modal');
modalRef?.addEventListener('click', onModalClose);
document.addEventListener('keydown', onModalClose);

function onModalClose(e) {
  if (
    e.target.classList.contains('popup') ||
    e.keyCode === 27 ||
    e.target.classList.contains('popup-button__close')
  ) {
    modalRef.classList.remove('popup');
    modalRef.innerHTML = '';
  }
}
