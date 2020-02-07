import { combineReducers } from 'redux';
import excelGrid from './excelGrid';
import empty from './empty';
import modelReducer from './modelReducer.ts';

const createRootReducer = () => combineReducers({
  excelGrid,
  empty,
  modelReducer,
});
export default createRootReducer;
