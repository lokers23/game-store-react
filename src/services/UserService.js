import axios from 'axios';
import { URL, LOCAL_STORAGE } from '../Constants';

export class userService {
  static getHeader() {
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

  static getUserData() {
    const headers = this.getHeader();
    return axios.get(URL.USER + '/profile', headers);
  }

  // for admin/moderator
  static getUsers() {
    const url = URL.USER;
    const headers = this.getHeader();
    return axios.get(url, headers);
  }

  static changePassword(data) {
    const url = URL.USER + '/password';
    const headers = this.getHeader();
    return axios.put(url, data, headers);
  }
}
