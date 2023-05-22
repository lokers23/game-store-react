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

  static getOrdersByUser() {
    return axios.get(URL.ORDER + '/user', this.getHeaders());
  }

  static getOrders() {
    return axios.get(URL.ORDER, this.getHeaders());
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
