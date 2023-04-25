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

  static getGenres() {
    return axios.get(URL.GENRE);
  }

  static getGenreById(id) {
    return axios.get(URL.GENRE + `/${id}`);
  }

  static deleteGenre(id) {
    return axios.delete(URL.GENRE + `/${id}`);
  }

  static saveGenre(genre) {
    if (genre.id !== 0) {
      return axios.put(URL.GENRE, genre);
    }

    return axios.post(URL.GENRE, genre);
  }
}
