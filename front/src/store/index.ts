import { combineReducers } from 'redux';
import model from './model/modelReducer.ts';

const createRootReducer = () => combineReducers({
  model,
});
// eslint-disable-next-line import/prefer-default-export
export { createRootReducer };
