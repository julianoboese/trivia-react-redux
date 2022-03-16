import { getCurrentDateNTime } from '../utils/auxiliarFunctions';

const TOKEN = 'token';
const RANKING = 'ranking';

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRanking = () => JSON.parse(localStorage.getItem(RANKING));

export const saveStoredScore = (name, score, picture, questions) => {
  const currentRanking = getStoredRanking() || [];

  const gameDateData = getCurrentDateNTime();

  const newData = { name, score, picture, date: gameDateData, questions };
  const newRanking = [...currentRanking, newData];
  newRanking.sort(({ score: a }, { score: b }) => b - a);
  localStorage.setItem(RANKING, JSON.stringify((newRanking)));
};
