import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class userService {
  static #getHeader() {
    const token = tokenService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    return headers;
  }

  static getUserData() {
    const headers = this.#getHeader();
    return axios.get(URL.USER + '/profile', headers);
  }

  // for admin/moderator
  static getUsers(page, pageSize, sort, filters) {
    let url = URL.USER;
    const headers = this.#getHeader();
    //return axios.get(url, headers);

    const params = [];
    if (page && pageSize) {
      params.push(`page=${page}`);
      params.push(`pageSize=${pageSize}`);
    }

    if (sort) {
      params.push(`sort=${sort}`);
    }

    if (filters) {
      params.push(`${filters}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return axios.get(url, headers);
  }

  static changePassword(data) {
    const url = URL.USER + '/password';
    const headers = this.#getHeader();
    return axios.put(url, data, headers);
  }

  static deleteUser(id) {
    //const url = ;
    const headers = this.#getHeader();
    return axios.delete(URL.USER + `/${id}`, headers);
  }

  static getUserById(id) {
    //const url = ;
    const headers = this.#getHeader();
    return axios.get(URL.USER + `/${id}`, headers);
  }

  static changeRole(userId, role) {
    const headers = this.#getHeader();
    const roleObject = {
      userId: Number(userId),
      role: Number(role)
    };

    return axios.put(URL.USER + `/role`, roleObject, headers);
  }
}
