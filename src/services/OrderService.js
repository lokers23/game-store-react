import axios from 'axios';
import { LOCAL_STORAGE, URL } from '../Constants';

export class orderService {
  static getHeaders() {
    const data = localStorage.getItem(LOCAL_STORAGE.TOKEN_STORAGE);
    const jsonData = JSON.parse(data);
    const headers = {
      headers: {
        Authorization: `Bearer ${jsonData.token}`,
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

    return axios.get(url, this.getHeaders());
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

    return axios.get(url, this.getHeaders());
  }

  static getOrderById(id) {
    return axios.get(URL.ORDER + `/${id}`);
  }

  static deleteOrder(id) {
    return axios.delete(URL.ORDER + `/${id}`);
  }

  static saveOrder(id, order) {
    if (id > 0) {
      return axios.put(URL.ORDER + `/${id}`, order, this.getHeaders());
    }

    return axios.post(URL.ORDER, order, this.getHeaders());
  }
}
