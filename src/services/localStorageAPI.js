const TOKEN = 'token';
const RANKING = 'ranking';

if (!localStorage.getItem(TOKEN)) {
  localStorage.setItem(TOKEN, JSON.stringify([]));
}

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRankig = () => localStorage.getItem(RANKING);
