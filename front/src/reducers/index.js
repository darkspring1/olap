import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import excelGrid from './excelGrid'
import empty from "./empty"

export default combineReducers({
  routing: routerReducer,
  excelGrid,
  empty
})