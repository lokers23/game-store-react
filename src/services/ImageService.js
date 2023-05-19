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
    return URL.IMAGE + `/${gameId}/${nameImage}`;
  }

  static createImage(gameId, image) {
    return axios.post(URL.IMAGE + `/${gameId}/`, image);
  }

  static deleteImage(id) {
    return axios.delete(URL.IMAGE + `/${id}/`);
  }
}
