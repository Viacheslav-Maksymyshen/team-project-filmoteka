import { genres } from './genres';
import { refs } from './refs';
import { renderCard } from './renderCard';
import { getGenreName } from './getGenreName';
import Notiflix from 'notiflix';

import FilmsAPI from './apiServiсe';
const filters = new FilmsAPI();

let genresList = genres;

refs.formEl.addEventListener('change', event => {
  let formValue = event.target;
  event.preventDefault();
  filters.currentPage = 1;

  if (formValue.id === 'years') {
    if (formValue.value !== 'year') {
      refs.loader.classList.remove('hidden');
      Notiflix.Notify.success(
        `Congratulations! found movies for ${formValue.value} year!`
      );
      filters.year = formValue.value;
      markupMoviesByYear();
      refs.loader.classList.remove('hidden');
    }
  }
  if (formValue.id === 'genres') {
    if (formValue.value !== 'genres') {
      refs.loader.classList.remove('hidden');
      Notiflix.Notify.success(
        `Congratulations! found movies by genre ${formValue.value}!`
      );
      for (const el of genresList) {
        if (el.name === formValue.value) {
          filters.genreId = el.id;
          markupMoviesByGenres();
        }
      }
      refs.loader.classList.remove('hidden');
    }
  }
  if (formValue.id === 'popularity') {
    if (formValue.value !== 'option') {
      refs.loader.classList.remove('hidden');
      //  refs.searchBackdrop.classList.remove('is-open');
      Notiflix.Notify.success(
        `Congratulations! found the most popular movies!`
      );
      filters.popularity = formValue.value;
      markupMoviesByPopularity();
      refs.loader.classList.remove('hidden');
    }
  }
  // refs.formEl.reset();
});

refs.searchBtnOpen.addEventListener('click', onClickSearchBtnOpen);
refs.searchBtnClose.addEventListener('click', onClickSearchBtnClose);

function onClickSearchBtnOpen() {
  refs.searchBackdrop.classList.add('is-open');
}

function onClickSearchBtnClose() {
  refs.searchBackdrop.classList.remove('is-open');
}
async function markupMoviesByGenres() {
  refs.mainSection.innerHTML = '';
  try {
    refs.loader.classList.remove('hidden');
    const result = await filters.getMoviesByGenres();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;

      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
    refs.loader.classList.add('hidden');
  } catch (error) {
    console.log(error);
  }
  infinteScrollByGenres();
}
async function markupMoviesByPopularity() {
  refs.mainSection.innerHTML = '';
  try {
    refs.loader.classList.remove('hidden');
    const result = await filters.getMoviesByPopularity();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;
      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
    refs.loader.classList.add('hidden');
  } catch (error) {
    console.log(error);
  }
  infinteScrollByPopularity();
}
async function markupMoviesByYear() {
  refs.mainSection.innerHTML = '';
  try {
    refs.loader.classList.remove('hidden');
    const result = await filters.getMoviesByYear();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;
      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
    refs.loader.classList.add('hidden');
  } catch (error) {
    console.log(error);
  }
  infinteScrollByYear();
}
async function loadMoreMovieByGenres() {
  filters.currentPage += 1;
  try {
    const result = await filters.getMoviesByGenres();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;
      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
  } catch (error) {
    console.log(error);
  }
  infinteScrollByGenres();
}
async function loadMoreMovieByPopularity() {
  filters.currentPage += 1;
  try {
    const result = await filters.getMoviesByPopularity();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;
      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
  } catch (error) {
    console.log(error);
  }
  infinteScrollByPopularity();
}
async function loadMoreMovieByYear() {
  filters.currentPage += 1;
  try {
    const result = await filters.getMoviesByYear();
    result.data.results.forEach(film => {
      const {
        title,
        name,
        poster_path,
        id,
        vote_average,
        genre_ids,
        first_air_date,
        release_date,
      } = film;
      let genre = getGenreName(genre_ids);
      renderCard(
        id,
        poster_path,
        title,
        name,
        genre,
        first_air_date,
        release_date,
        vote_average
      );
    });
  } catch (error) {
    console.log(error);
  }
  infinteScrollByYear();
}

const infinteObserverByGenres = new IntersectionObserver(
  ([entry], observer) => {
    // перевірка останього елемента
    if (entry.isIntersecting) {
      // перестаємо його відслідковувати
      observer.unobserve(entry.target);
      // Завантажуємо нову порцію контенту
      loadMoreMovieByGenres();
    }
  },
  { threshold: 0.5 }
);

const infinteScrollByGenres = () => {
  const lastCard = document.querySelector('.card__item:last-child');
  if (lastCard) {
    infinteObserverByGenres.observe(lastCard);
  }
};

const infinteObserverByPopularity = new IntersectionObserver(
  ([entry], observer) => {
    // перевірка останього елемента
    if (entry.isIntersecting) {
      // перестаємо його відслідковувати
      observer.unobserve(entry.target);
      // Завантажуємо нову порцію контенту
      loadMoreMovieByPopularity();
    }
  },
  { threshold: 0.5 }
);

const infinteScrollByPopularity = () => {
  const lastCard = document.querySelector('.card__item:last-child');
  if (lastCard) {
    infinteObserverByPopularity.observe(lastCard);
  }
};

const infinteObserverByYear = new IntersectionObserver(
  ([entry], observer) => {
    // перевірка останього елемента
    if (entry.isIntersecting) {
      // перестаємо його відслідковувати
      observer.unobserve(entry.target);
      // Завантажуємо нову порцію контенту
      loadMoreMovieByYear();
    }
  },
  { threshold: 0.5 }
);

const infinteScrollByYear = () => {
  const lastCard = document.querySelector('.card__item:last-child');
  if (lastCard) {
    infinteObserverByYear.observe(lastCard);
  }
};
