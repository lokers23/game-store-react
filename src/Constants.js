const BASE_URL = 'https://localhost:7125';

const API = {
  USER: '/api/user',
  GAME: '/api/games',
  GENRE: '/api/genres',
  IMAGE: '/api/images',
  AVATAR: '/api/games/avatars'
};

const URL = {
  LOGIN: BASE_URL + API.USER + '/login',
  GAME: BASE_URL + API.GAME,
  GENRE: BASE_URL + API.GENRE,
  IMAGE: BASE_URL + API.IMAGE,
  AVATAR: BASE_URL + API.AVATAR
};

export { URL };
