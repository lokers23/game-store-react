import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class minSpecificationService {
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

  // static getMinSpecs(platformName) {
  //   let url = URL.MINSPEC;
  //   const params = [];
  //   if (page && pageSize) {
  //     params.push(`page=${page}`);
  //     params.push(`pageSize=${pageSize}`);
  //   }

  //   if (params.length > 0) {
  //     url += `?${params.join('&')}`;
  //   }

  //   return axios.get(url);
  //   //return axios.get(`${URL.MINSPEC}?platformName=${platformName}`);
  // }
  //

  static getMinSpecs(page, pageSize, sort, filters) {
    let url = URL.MINSPEC;
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

  static getMinSpecById(id) {
    return axios.get(URL.MINSPEC + `/${id}`);
  }

  static deleteMinSpec(id) {
    return axios.delete(URL.MINSPEC + `/${id}`, this.#getHeader());
  }

  static saveMinSpec(id, minSpec) {
    if (id > 0) {
      return axios.put(URL.MINSPEC + `/${id}`, minSpec, this.#getHeader());
    }

    return axios.post(URL.MINSPEC, minSpec, this.#getHeader());
  }
}
