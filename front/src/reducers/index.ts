import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import excelGrid from './excelGrid';
import empty from './empty';

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  excelGrid,
  empty,
});
export default createRootReducer;
