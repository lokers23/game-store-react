import axios from 'axios';
import { URL } from '../Constants';

export class gameService {
  constructor(headers) {
    headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  // static getGames(sort, filter) {

  //   if (sort) {
  //     return axios.get(URL.GAME + `?${sort}&${filter}`);
  //   } else if (filter) {
  //     return axios.get(URL.GAME + `?${filter}`);
  //   }

  //   return axios.get(URL.GAME);
  // }
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
    return axios.delete(URL.GAME + `/${id}`);
  }

  static getGameById(id) {
    return axios.get(URL.GAME + `/${id}`);
  }

  static saveGame(id, game) {
    if (id > 0) {
      return axios.put(URL.GAME + `/${id}`, game);
    }

    return axios.post(URL.GAME, game);
  }

  static getAvatarUrl(avatarName) {
    if (!avatarName) {
      return '';
    }

    return URL.AVATAR + `/${avatarName}`;
  }

  static saveFormGame(id, formGame) {
    if (id > 0) {
      return axios.put(URL.GAME + `/${id}`, formGame, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    return axios.post(URL.GAME, formGame, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  static getNumberOfKeys(id) {
    if (id) {
      return axios.get(URL.GAME + `/${id}/count`);
    }

    return Promise.resolve(0);
  }
}
