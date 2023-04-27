import axios from 'axios';
import { URL } from '../Constants';

export class orderService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getOrders() {
    return axios.get(URL.ORDER);
  }

  static getOrderById(id) {
    return axios.get(URL.ORDER + `/${id}`);
  }

  static deleteOrder(id) {
    return axios.delete(URL.ORDER + `/${id}`);
  }

  static saveOrder(id, order) {
    if (id > 0) {
      return axios.put(URL.ORDER + `/${id}`, order);
    }

    return axios.post(URL.ORDER, order);
  }
}
