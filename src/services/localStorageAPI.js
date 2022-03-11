const TOKEN = 'token';
const RANKING = 'ranking';

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRankig = () => JSON.parse(localStorage.getItem(RANKING));

export const saveStoredScore = (name, score, picture) => {
  const currentRanking = getStoredRankig() || [];
  const newData = { name, score, picture };
  const newRanking = [...currentRanking, newData];
  newRanking.sort(({ score: a }, { score: b }) => b - a);
  localStorage.setItem(RANKING, JSON.stringify((newRanking)));
};
