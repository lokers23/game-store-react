import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class keyService {
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

  static getKeys(page, pageSize, sort, filters) {
    let url = URL.KEY;
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

    return axios.get(url, this.#getHeader());
  }

  static getKeyById(id) {
    return axios.get(URL.KEY + `/${id}`, this.#getHeader());
  }

  static deleteKey(id) {
    return axios.delete(URL.KEY + `/${id}`, this.#getHeader());
  }

  static saveKey(id, key) {
    if (id > 0) {
      return axios.put(URL.KEY + `/${id}`, key, this.#getHeader());
    }

    return axios.post(URL.KEY, key, this.#getHeader());
  }
}
