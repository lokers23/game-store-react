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

  static getKeys(page, pageSize) {
    let url = URL.KEY;
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
