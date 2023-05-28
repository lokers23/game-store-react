import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class developerService {
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

  static getDevelopers(page, pageSize, sort, filters) {
    let url = URL.DEVELOPER;
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

  static getDeveloperById(id) {
    return axios.get(URL.DEVELOPER + `/${id}`);
  }

  static deleteDeveloper(id) {
    return axios.delete(URL.DEVELOPER + `/${id}`, this.#getHeader());
  }

  static saveDeveloper(id, developer) {
    if (id > 0) {
      return axios.put(URL.DEVELOPER + `/${id}`, developer, this.#getHeader());
    }

    return axios.post(URL.DEVELOPER, developer, this.#getHeader());
  }
}
