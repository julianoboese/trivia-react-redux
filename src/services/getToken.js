const getToken = async () => {
  const apiResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const apiResponseJson = await apiResponse.json();
  return apiResponseJson.token;
};
export default getToken;
