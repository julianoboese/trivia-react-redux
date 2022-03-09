import getToken from '../../services/getToken';

export const GET_TOKEN = 'GET_TOKEN';

export const getTokenAction = () => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', token);
  dispatch({ type: GET_TOKEN, payload: { token } });
};
