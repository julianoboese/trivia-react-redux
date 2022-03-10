export async function getNewToken() {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const gameToken = await response.json();
    return gameToken;
  } catch (error) {
    return error;
  }
}

export async function getQuestionsData(token, questionsQuantity) {
  if (token.length > 0) {
    try {
      const url = `https://opentdb.com/api.php?amount=${questionsQuantity}&token=${token}`;
      const response = await fetch(url);
      const triviaData = await response.json();
      return triviaData;
    } catch (error) {
      return error;
    }
  }
}

export async function getNewGameData(token, questionsQuantity) {
  let gameData = getQuestionsData(token, questionsQuantity);
  if (gameData.response_code !== 0) {
    const newToken = await getNewToken();
    try {
      const url = `https://opentdb.com/api.php?amount=${questionsQuantity}&token=${newToken.token}`;
      const response = await fetch(url);
      gameData = await response.json();
    } catch (error) {
      return error;
    }
  }
  return gameData;
}
