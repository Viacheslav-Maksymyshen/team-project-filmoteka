import FilmsAPI from './apiServiсe';
const trendingFilms = new FilmsAPI();
const filmCard = document.querySelector('.section');
const popupCards = document.querySelector('.modal');

export const renderMovieModal = function (
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
) {
  let poster_url;
  if (!poster_path) {
    poster_url = `https://img.freepik.com/free-vector/funny-error-404-background-design_1167-219.jpg`;
  } else {
    poster_url = `https://www.themoviedb.org/t/p/w500${poster_path}`;
  }
  popupCards.classList.add('popup');

  popupCards.innerHTML = ` <div class="popup__body">
    <button type="button" class="popup-button" data-popup-modal-close>
        <svg class="popup-button__close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
        </svg>
        </button>
    <div class="popup__content">
        <div class="popup--leftpart">
            <img class="popup__img" src="${poster_url}" alt ="${title ?? name}">
            </div>
            <div class="popup--rightpart">
            <h2 class="popup__title">${title ?? name}</h2>
            <ul class="popup__list">
              <li class="popup__item">Vote&#47;Votes <span class="popup__span popup__span--background">${vote_average} </span> &#47; <span class="popup__span"> ${vote_count}</span></li>
              <li class="popup__item">Popularity <span class="popup__span popup__span__popularity">${popularity}</span></li>
              <li class="popup__item">Original Title <span class="popup__span popup__span__title">${
                title ?? name
              }</span></li>
              <li class="popup__item">Genre <span class="popup__span popup__span__name">${
                genre.slice(0, 2).join(', ') + ', Other'
              }</span></li>
            </ul>
            <h1 lang="en" class="popup__about">About</h1>
            <p class="popup__overview">${overview}</p>
            <div class="popup__button">
              <button data-id=${id} class="watched-button" type="submit">${watchBtnLabel}</button>
              <button data-id=${id} class="queque-button" type="submit">${queueBtnLabel}</button>
            </div>    
        </div>
    </div>
  </div>`;
  filmCard.appendChild(popupCards);
};
