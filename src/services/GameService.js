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

  static saveGame(game) {
    if (game.id !== 0) {
      return axios.put(URL.GAME, game);
    }

    return axios.post(URL.GAME, game);
  }

  static getAvatarUrl(avatarName) {
    return URL.AVATAR + `/${avatarName}`;
  }
}
