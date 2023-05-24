import axios from 'axios';
import { URL } from '../Constants';

export class activationService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getActivations(page, pageSize) {
    let url = URL.ACTIVATION;
    const params = [];
    if (page && pageSize) {
      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
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
    return axios.delete(URL.ACTIVATION + `/${id}`);
  }

  static saveActivation(id, activation) {
    if (id > 0) {
      return axios.put(URL.ACTIVATION + `/${id}`, activation);
    }

    return axios.post(URL.ACTIVATION, activation);
  }
}
