export class tokenService {
  static setToken(key, token) {
    //window.localStorage.setItem(key, token);
    localStorage.setItem(key, JSON.stringify(token));
  }

  static getToken(key) {
    let token = window.localStorage.getItem(key);
    return token;
  }
}

export default tokenService;
