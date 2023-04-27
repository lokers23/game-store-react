import axios from 'axios';
import { URL } from '../Constants';

export class platformService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  static getPlatforms() {
    return axios.get(URL.PLATFORM);
  }

  static getPlatformById(id) {
    return axios.get(URL.PLATFORM + `/${id}`);
  }

  static deletePlatform(id) {
    return axios.delete(URL.PLATFORM + `/${id}`);
  }

  static savePlatform(id, platform) {
    if (id > 0) {
      return axios.put(URL.PLATFORM + `/${id}`, platform);
    }

    return axios.post(URL.PLATFORM, platform);
  }
}
