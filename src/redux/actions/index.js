import getToken from '../../services/getToken';

export const GET_TOKEN = 'GET_TOKEN';

export const userLoginAction = (name, email) => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', token);
  dispatch({ type: GET_TOKEN, payload: { name, email, token } });
};