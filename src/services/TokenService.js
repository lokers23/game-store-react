import { LOCAL_STORAGE } from '../Constants';

export class tokenService {
  static setToken(key, token) {
    //window.localStorage.setItem(key, token);
    localStorage.setItem(key, JSON.stringify(token));
  }

  static getToken() {
    const json = localStorage.getItem(LOCAL_STORAGE.TOKEN_STORAGE);
    if (json) {
      const data = JSON.parse(json);
      return data.token;
    }

    return '';
  }
}

export default tokenService;
