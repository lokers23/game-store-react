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

  static getGames() {
    return axios.get(URL.GAME); //, this.headers);
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
}
