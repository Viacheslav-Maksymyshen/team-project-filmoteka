import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3/`;
const API_KEY = '2bbca05b4a0698db2e0a185255a0cc70&page';

export default class FilmsAPI {
  constructor() {
    this.currentPage = 0;
    this.inputData = '';
    this.lang = 'en-US';
    this.genres = [];
    this.genreId = 'default';
    this.popularity = 'popularity';
    this.year = '2022';
  }
  async getTrendingFilms() {
    const response = await axios.get(
      `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${this.currentPage}&language=${this.lang}`
    );
    return response;
  }
  async getFilmID(filmID) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${filmID}?api_key=${API_KEY}&language=${this.lang}`
    );
    return response;
  }
  async getMovieSearch() {
    const response = await axios.get(
      `${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.inputData}&page=${this.currentPage}&include_adult=false&language=${this.lang}`
    );
    return response;
  }
  async getGenres() {
    const response = await axios.get(
      `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=${this.lang}`
    );
    return response;
  }
  async getFilmTrailler() {
    const response = await axios.get(
      `${BASE_URL}movie/${filmID}/videos?api_key=${API_KEY}&language=${this.lang}`
    );
    return response;
  }
  //searching form with genres
  async getMoviesByGenres() {
    const response = await axios.get(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&language=${this.lang}&sort_by=${this.popularity}.desc&include_adult=false&include_video=false&page=${this.currentPage}&with_genres=${this.genreId}&primary_release_date.gte=${this.year}-01-01&primary_release_date.lte=${this.year}-12-31`
    );
    return response;
  }
  async getMoviesByYear() {
    const response = await axios.get(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&language=${this.lang}&sort_by=${this.popularity}.desc&include_adult=false&include_video=false&page=${this.currentPage}&with_genres=${this.genreId}&primary_release_date.gte=${this.year}-01-01&primary_release_date.lte=${this.year}-12-31`
    );
    return response;
  }
  async getMoviesByPopularity() {
    const response = await axios.get(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&language=${this.lang}&sort_by=${this.popularity}.desc&include_adult=false&include_video=false&page=${this.currentPage}&with_genres=${this.genreId}&primary_release_date.gte=${this.year}-01-01&primary_release_date.lte=${this.year}-12-31`
    );
    return response;
  }
}
