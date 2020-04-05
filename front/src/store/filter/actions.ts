
import {
  LOAD_FILTERS_REQUESTED,
  LOAD_FILTERS_SUCCEEDED,
  LOAD_FILTERS_FAILED,
  IFilterDescription,
} from './types';
import IAction from '../iAction';


export function loadFiltersRequested(payload: string[]): IAction<string[]> {
  return {
    type: LOAD_FILTERS_REQUESTED,
    payload,
  };
}

export function loadFiltersSucceeded(payload: IFilterDescription[]): IAction<IFilterDescription[]> {
  return {
    type: LOAD_FILTERS_SUCCEEDED,
    payload,
  };
}

export function loadFiltersFailed(): IAction<any> {
  return {
    type: LOAD_FILTERS_FAILED,
    payload: null,
  };
}
