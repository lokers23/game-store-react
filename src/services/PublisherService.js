import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class publisherService {
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

  static getPublishers(page, pageSize, sort, filters) {
    let url = URL.PUBLISHER;
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

  static getPublisherById(id) {
    return axios.get(URL.PUBLISHER + `/${id}`);
  }

  static deletePublisher(id) {
    return axios.delete(URL.PUBLISHER + `/${id}`, this.#getHeader());
  }

  static savePublisher(id, publisher) {
    if (id > 0) {
      return axios.put(URL.PUBLISHER + `/${id}`, publisher, this.#getHeader());
    }

    return axios.post(URL.PUBLISHER, publisher, this.#getHeader());
  }
}
