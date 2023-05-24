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

  static getMinSpecs(page, pageSize) {
    let url = URL.MINSPEC;
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
