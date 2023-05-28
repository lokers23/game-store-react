import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class platformService {
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

  static getPlatforms(page, pageSize, sort, filters) {
    let url = URL.PLATFORM;
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

  static getPlatformById(id) {
    return axios.get(URL.PLATFORM + `/${id}`);
  }

  static deletePlatform(id) {
    return axios.delete(URL.PLATFORM + `/${id}`, this.#getHeader());
  }

  static savePlatform(id, platform) {
    if (id > 0) {
      return axios.put(URL.PLATFORM + `/${id}`, platform, this.#getHeader());
    }

    return axios.post(URL.PLATFORM, platform, this.#getHeader());
  }
}
