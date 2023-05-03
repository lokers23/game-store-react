import axios from 'axios';
import { URL } from '../Constants';

export class minSpecificationService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getMinSpecs(platformName) {
    return axios.get(URL.MINSPEC);
    //return axios.get(`${URL.MINSPEC}?platformName=${platformName}`);
  }

  static getMinSpecById(id) {
    return axios.get(URL.MINSPEC + `/${id}`);
  }

  static deleteMinSpec(id) {
    return axios.delete(URL.MINSPEC + `/${id}`);
  }

  static saveMinSpec(id, minSpec) {
    if (id > 0) {
      return axios.put(URL.MINSPEC + `/${id}`, minSpec);
    }

    return axios.post(URL.MINSPEC, minSpec);
  }
}
