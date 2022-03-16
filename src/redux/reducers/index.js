import { GET_TOKEN, INCREASE_SCORE, RESET_SCORE, SAVE_CONFIGS } from '../actions';

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
  case RESET_SCORE:
    return ({
      ...state,
      player: {
        ...state.player,
        assertions: 0,
        score: 0,
      },
    });
    // coloquei um novo caso para resetar os pontos do placar e acertos porque se eu colocasse para que quando o score recebisso fosse 0 resetar o placar isso poderia atrapalhar no desenvolvimento de outros modos de jogo.

  default:
    return state;
  }
};

//     return ({
//   ...state,
//   player: { ...state.player, payload.score },
// });

export default rootReducer;
