import { combineReducers } from 'redux';
import model from './model/modelReducer.ts';
import IState from './iState.ts';
import IAction from './iAction.ts';

const createRootReducer = () => combineReducers({
  model,
});

export { createRootReducer, IState, IAction };
