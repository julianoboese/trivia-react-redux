import getToken from '../../services/getToken';

export const GET_TOKEN = 'GET_TOKEN';
export const INCREASE_SCORE = 'INCREASE_SCORE';
// export const SAVE_SCORE = 'SAVESCORE';

export const userLoginAction = (name, email) => async (dispatch) => {
  const token = await getToken();
  localStorage.setItem('token', token);
  dispatch({ type: GET_TOKEN, payload: { name, email, token } });
};

export const updateScore = (score = 0) => ({
  type: INCREASE_SCORE,
  payload: {
    score,
  },
});
