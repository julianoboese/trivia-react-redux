import { } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const rootReducer = (state = INITIAL_STATE) => state;
export default rootReducer;
