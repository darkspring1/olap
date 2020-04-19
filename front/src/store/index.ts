import { combineReducers } from 'redux';
import model from './model/modelReducer';
import filters from './filter/filterReducer';
import cells from './cell/cellReducer';
import IState from './iState';
import IAction from './iAction';

const createRootReducer = () => combineReducers({
  model,
  filters,
  cells,
});

export { createRootReducer, IState, IAction };
