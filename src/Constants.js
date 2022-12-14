const BASE_URL = 'https://localhost:7125';

const API = {
    USER: '/api/user',
    GAME:'/api/game'
}

const URL = {
    LOGIN: BASE_URL + API.USER + '/login',
    GAME: BASE_URL + API.GAME
}

export { URL };