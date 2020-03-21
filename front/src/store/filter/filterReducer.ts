import IAction from '../iAction';
import { LOAD_FILTERS_SUCCEEDED } from './types';
import { IFilterDescription } from '.';

const initialState: IFilterDescription[] = [];

export default (state: IFilterDescription[] = initialState, action: IAction<any>): IFilterDescription[] => {
  switch (action.type) {
    case LOAD_FILTERS_SUCCEEDED:
      return action.payload;

    default:
      return state;
  }
};
