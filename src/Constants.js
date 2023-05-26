//const BASE_URL = 'https://localhost:7125';
const BASE_URL = 'https://lokers-001-site1.ctempurl.com';

const ROLES = {
  1: 'Administrator',
  2: 'Moderator',
  3: 'User'
};

const LOCAL_STORAGE = {
  TOKEN_STORAGE: 'token-game-store',
  CART_GAME: 'cartGames'
};

const API = {
  USER: '/api/users',
  GAME: '/api/games',
  GENRE: '/api/genres',
  DEVELOPER: '/api/developers',
  PUBLISHER: '/api/publishers',
  KEY: '/api/keys',
  MINSPEC: '/api/minspecs',
  ACTIVATION: '/api/activations',
  ORDER: '/api/orders',
  PLATFORM: '/api/platforms',
  IMAGE: '/api/images',
  AVATAR: '/api/games/avatars',
  BALANCE: '/api/balance'
};

const URL = {
  LOGIN: BASE_URL + API.USER + '/login',
  GAME: BASE_URL + API.GAME,
  GENRE: BASE_URL + API.GENRE,
  DEVELOPER: BASE_URL + API.DEVELOPER,
  PUBLISHER: BASE_URL + API.PUBLISHER,
  KEY: BASE_URL + API.KEY,
  MINSPEC: BASE_URL + API.MINSPEC,
  ACTIVATION: BASE_URL + API.ACTIVATION,
  ORDER: BASE_URL + API.ORDER,
  PLATFORM: BASE_URL + API.PLATFORM,
  IMAGE: BASE_URL + API.IMAGE,
  AVATAR: BASE_URL + API.AVATAR,
  USER: BASE_URL + API.USER,
  BALANCE: BASE_URL + API.BALANCE
};

export { BASE_URL, URL, LOCAL_STORAGE, ROLES };
