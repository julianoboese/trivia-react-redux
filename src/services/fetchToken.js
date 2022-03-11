async function getNewToken() {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const gameToken = await response.json();
    return gameToken;
  } catch (error) {
    return error;
  }
}

export default getNewToken;
