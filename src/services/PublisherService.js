import axios from 'axios';
import { URL } from '../Constants';

export class publisherService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getPublishers(page, pageSize) {
    let url = URL.PUBLISHER;
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

  static getPublisherById(id) {
    return axios.get(URL.PUBLISHER + `/${id}`);
  }

  static deletePublisher(id) {
    return axios.delete(URL.PUBLISHER + `/${id}`);
  }

  static savePublisher(id, publisher) {
    if (id > 0) {
      return axios.put(URL.PUBLISHER + `/${id}`, publisher);
    }

    return axios.post(URL.PUBLISHER, publisher);
  }
}
