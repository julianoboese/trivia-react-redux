const TOKEN = 'token';
const RANKING = 'ranking';

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRankig = () => localStorage.getItem(RANKING);
