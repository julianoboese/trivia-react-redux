import getNewToken from '../../services/fetchToken';

export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_CONFIGS = 'SAVE_CONFIGS';
export const INCREASE_SCORE = 'INCREASE_SCORE';
// export const SAVE_SCORE = 'SAVESCORE';

export const userLoginAction = (name, email) => async (dispatch) => {
  const token = await getNewToken();
  localStorage.setItem('token', token);
  dispatch({ type: GET_TOKEN, payload: { name, email, token } });
};

export const saveConfigsAction = (configs) => ({
  type: SAVE_CONFIGS,
  payload: configs,
});

export const updateScore = (score = 0) => ({
  type: INCREASE_SCORE,
  payload: {
    score,
  },
});
