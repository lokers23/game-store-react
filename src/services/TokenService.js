export class tokenService {
  static setToken(key, token) {
    window.localStorage.setItem(key, token);
  }

  static getToken(key) {
    let token = window.localStorage.getItem(key);
    return token;
  }
}

export default tokenService;
