const TOKEN = 'token';
const RANKING = 'ranking';

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRankig = () => JSON.parse(localStorage.getItem(RANKING));

export const saveStoredScore = (name, score, picture) => {
  const currentRanking = getStoredRankig() || [];
  const newData = { name, score, picture };
  const newRanking = JSON.stringify([...currentRanking, newData]);
  console.log(newRanking);
  localStorage.setItem(RANKING, newRanking);
};
