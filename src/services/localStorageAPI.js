import { getCurrentDateNTime } from '../utils/auxiliarFunctions';

const TOKEN = 'token';
const RANKING = 'ranking';

export const getStoredToken = () => localStorage.getItem(TOKEN);

export const getStoredRanking = () => JSON.parse(localStorage.getItem(RANKING));

export const saveStoredScore = (playerData, questions, configs) => {
  const currentRanking = getStoredRanking() || [];

  const gameDateData = getCurrentDateNTime();

  const newData = {
    name: playerData.name,
    score: playerData.gameScore,
    picture: playerData.picture,
    date: gameDateData,
    questions,
    configs };
  const newRanking = [...currentRanking, newData];
  newRanking.sort(({ score: a }, { score: b }) => b - a);
  localStorage.setItem(RANKING, JSON.stringify((newRanking)));
};
