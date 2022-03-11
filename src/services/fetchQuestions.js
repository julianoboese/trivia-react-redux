import getNewToken from './fetchToken';

export async function getQuestionsData({ token, quantity, category, difficulty, type }) {
  if (token.length > 0) {
    try {
      let url = `https://opentdb.com/api.php?amount=${quantity}&token=${token}`;
      if (category) {
        url = `${url}&category=${category}`;
      }
      if (difficulty) {
        url = `${url}&difficulty=${difficulty}`;
      }
      if (type) {
        url = `${url}&type=${type}`;
      }
      const response = await fetch(url);
      const triviaData = await response.json();
      return triviaData;
    } catch (error) {
      return error;
    }
  }
}

export async function getNewGameData({ token, quantity, category, difficulty, type }) {
  let gameData = await getQuestionsData({ token, quantity, category, difficulty, type });
  if (gameData.response_code !== 0) {
    const newToken = await getNewToken();
    try {
      gameData = await getQuestionsData({
        token: newToken.token,
        quantity,
        category,
        difficulty,
        type,
      });
    } catch (error) {
      return error;
    }
  }
  return gameData;
}
