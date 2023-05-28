import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class genreService {
  static #getHeader() {
    const token = tokenService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return headers;
  }

  static getGenres(page, pageSize, sort, filters) {
    let url = URL.GENRE;
    const params = [];
    if (page && pageSize) {
      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
    }

    if (sort) {
      params.push(`sort=${sort}`);
    }

    if (filters) {
      params.push(`${filters}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return axios.get(url);
  }

  static getGenreById(id) {
    return axios.get(URL.GENRE + `/${id}`);
  }

  static deleteGenre(id) {
    return axios.delete(URL.GENRE + `/${id}`, this.#getHeader());
  }

  static saveGenre(id, genre) {
    if (id > 0) {
      return axios.put(URL.GENRE + `/${id}`, genre, this.#getHeader());
    }

    return axios.post(URL.GENRE, genre, this.#getHeader());
  }
}
