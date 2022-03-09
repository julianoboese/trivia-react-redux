import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: [],
};

const rootReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return ({
      ...state,
      token: payload.token,
      player: { ...state.player, gravatarEmail: payload.email },
    });
  default:
    return state;
  }
};

export default rootReducer;
