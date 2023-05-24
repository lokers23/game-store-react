import axios from 'axios';
import { URL } from '../Constants';

export class developerService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getDevelopers(page, pageSize) {
    let url = URL.DEVELOPER;
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

  static getDeveloperById(id) {
    return axios.get(URL.DEVELOPER + `/${id}`);
  }

  static deleteDeveloper(id) {
    return axios.delete(URL.DEVELOPER + `/${id}`);
  }

  static saveDeveloper(id, developer) {
    if (id > 0) {
      return axios.put(URL.DEVELOPER + `/${id}`, developer);
    }

    return axios.post(URL.DEVELOPER, developer);
  }
}
