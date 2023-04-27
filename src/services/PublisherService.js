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

  static getPublishers() {
    return axios.get(URL.PUBLISHER);
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
