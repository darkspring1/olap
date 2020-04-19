
import IAction from '../iAction';
import { ICell, LOAD_CELLS_SUCCEEDED } from './types';

const initialState: ICell[] = [];

export default (state: ICell[] = initialState, action: IAction<any>): ICell[] => {
  switch (action.type) {
    case LOAD_CELLS_SUCCEEDED:
      return action.payload;

    default:
      return state;
  }
};
