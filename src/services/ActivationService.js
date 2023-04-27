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

  static getActivations() {
    return axios.get(URL.ACTIVATION);
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
