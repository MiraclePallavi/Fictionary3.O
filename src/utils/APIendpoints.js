const BASE_URL = import.meta.env.VITE_API_HOST || 'http://127.0.0.1:8000';



const endpoints = {
    BASE_URL,
    GH_LOGIN: BASE_URL + '/accounts/github/login/',
    GOOGLE_LOGIN: BASE_URL + '/accounts/google/login/',
    CHECK_HINT_AVAILABLE: BASE_URL + '/api/check-clue-available/',
    QUESTION: BASE_URL + '/api/question/',
    ANSWER: BASE_URL + '/api/answer/',
    CLUE: BASE_URL + '/api/clue/',
    SOCIAL_LOGIN_TOKEN: BASE_URL + '/api/accounts/get-social-token/',
    LEADERBOARD: BASE_URL + '/api/leaderboard/',
    CHECK_GAME_LIVE: BASE_URL + '/api/check-game-live/',
    CARDS: BASE_URL + '/api/cards/',
    CHANGE_CARD_STATUS: BASE_URL + '/api/change-card-status/',
    GET_USER_COINS: BASE_URL + '/api/get-user-coins/',
     GET_UPDATES: BASE_URL + '/api/get-updates/'
}

export default endpoints;