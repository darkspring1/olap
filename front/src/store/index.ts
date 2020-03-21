import { combineReducers } from 'redux';
import model from './model/modelReducer';
import filters from './filter/filterReducer';
import IState from './iState';
import IAction from './iAction';

const createRootReducer = () => combineReducers({
  model,
  filters,
});

export { createRootReducer, IState, IAction };
