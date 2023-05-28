import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class activationService {
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

  static getActivations(page, pageSize, sort, filters) {
    let url = URL.ACTIVATION;
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

  static getActivationById(id) {
    return axios.get(URL.ACTIVATION + `/${id}`);
  }

  static deleteActivation(id) {
    return axios.delete(URL.ACTIVATION + `/${id}`, this.#getHeader());
  }

  static saveActivation(id, activation) {
    if (id > 0) {
      return axios.put(
        URL.ACTIVATION + `/${id}`,
        activation,
        this.#getHeader()
      );
    }

    return axios.post(URL.ACTIVATION, activation, this.#getHeader());
  }
}
