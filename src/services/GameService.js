import axios from 'axios';
import { URL } from '../Constants';
import tokenService from './TokenService';

export class gameService {
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

  static #getFormHeader() {
    const token = tokenService.getToken();
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    return headers;
  }

  static getGames(page, pageSize, sort, filters) {
    let url = URL.GAME;
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
    return axios.get(url);
  }

  static deleteGame(id) {
    return axios.delete(URL.GAME + `/${id}`, this.#getHeader());
  }

  static getGameById(id) {
    return axios.get(URL.GAME + `/${id}`);
  }

  static saveGame(id, game) {
    if (id > 0) {
      return axios.put(URL.GAME + `/${id}`, game, this.#getHeader());
    }

    return axios.post(URL.GAME, game, this.#getHeader());
  }

  static getAvatarUrl(avatarName) {
    if (!avatarName) {
      return '';
    }

    return URL.AVATAR + `/${avatarName}`;
  }

  static saveFormGame(id, formGame) {
    if (id > 0) {
      // return axios.put(URL.GAME + `/${id}`, formGame, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      return axios.put(URL.GAME + `/${id}`, formGame, this.#getFormHeader());
    }

    // return axios.post(URL.GAME, formGame, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    return axios.post(URL.GAME, formGame, this.#getFormHeader());
  }

  static getNumberOfKeys(id) {
    if (id) {
      return axios.get(URL.GAME + `/${id}/count`);
    }

    return Promise.resolve(0);
  }
}
