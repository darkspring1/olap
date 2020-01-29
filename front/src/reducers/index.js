import { combineReducers } from 'redux'
import excelGrid from './excelGrid'
import empty from "./empty"

export default combineReducers({
  excelGrid,
  empty
})