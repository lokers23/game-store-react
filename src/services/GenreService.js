import axios from 'axios';
import { URL } from '../Constants';

export class genreService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getGenres(page, pageSize) {
    let url = URL.GENRE;
    const params = [];
    if (page && pageSize) {
      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
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
    return axios.delete(URL.GENRE + `/${id}`);
  }

  static saveGenre(id, genre) {
    if (id > 0) {
      return axios.put(URL.GENRE + `/${id}`, genre);
    }

    return axios.post(URL.GENRE, genre);
  }
}
