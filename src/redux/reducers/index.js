import { GET_TOKEN, INCREASE_SCORE, SAVE_CONFIGS } from '../actions';

const INITIAL_STATE = {
  token: '',
  configs: {
    category: '',
    difficulty: '',
    type: '',
    initialTimer: 30,
    quantity: 5,
  },
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
      token: payload.token.token,
      player: { ...state.player, name: payload.name, gravatarEmail: payload.email },
    });

  case SAVE_CONFIGS:
    return ({
      ...state,
      configs: { ...payload },
    });

  case INCREASE_SCORE:
    return ({
      ...state,
      player: {
        ...state.player,
        assertions: (+state.player.assertions + 1),
        score: (+payload.score),
      },
    });

  default:
    return state;
  }
};

//     return ({
//   ...state,
//   player: { ...state.player, payload.score },
// });

export default rootReducer;
