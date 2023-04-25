import axios from 'axios';
import { URL } from '../Constants';

export class imageService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getImages(gameId) {
    return axios.get(URL.IMAGE + `/${gameId}/`);
  }

  static getImage(gameId, nameImage) {
    return axios.get(URL.IMAGE + `/${gameId}/${nameImage}`);
  }
}
