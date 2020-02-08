import { combineReducers } from 'redux';
import excelGrid from './excelGrid';
import empty from './empty';
import model from './model.ts';

const createRootReducer = () => combineReducers({
  excelGrid,
  empty,
  model,
});
export default createRootReducer;
