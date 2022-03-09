import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  token: tokenReducer, player: playerReducer, game: gameReducer });

export default rootReducer;
