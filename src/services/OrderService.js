import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class orderService {
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

  static getOrdersByUser(page, pageSize) {
    let url = URL.ORDER + '/user';
    const params = [];
    if (page && pageSize) {
      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return axios.get(url, this.#getHeader());
  }

  static getOrders(page, pageSize, sort, filters) {
    let url = URL.ORDER;
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

  static getOrderById(id) {
    return axios.get(URL.ORDER + `/${id}`, this.#getHeader());
  }

  static deleteOrder(id) {
    return axios.delete(URL.ORDER + `/${id}`, this.#getHeader());
  }

  static saveOrder(id, order) {
    if (id > 0) {
      return axios.put(URL.ORDER + `/${id}`, order, this.#getHeader());
    }

    return axios.post(URL.ORDER, order, this.#getHeader());
  }
}
