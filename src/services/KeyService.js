import axios from 'axios';
import { URL } from '../Constants';

export class keyService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getKeys() {
    return axios.get(URL.KEY);
  }

  static getKeyById(id) {
    return axios.get(URL.KEY + `/${id}`);
  }

  static deleteKey(id) {
    return axios.delete(URL.KEY + `/${id}`);
  }

  static saveKey(id, key) {
    if (id > 0) {
      return axios.put(URL.KEY + `/${id}`, key);
    }

    return axios.post(URL.KEY, key);
  }
}
