
import IAction from '../iAction';
import { ICell, SAVE_CELLS_SUCCEEDED, LOAD_CELLS_SUCCEEDED } from './types';

const initialState: ICell[] = [];

export default (state: ICell[] = initialState, action: IAction<any>): ICell[] => {
  switch (action.type) {
    case SAVE_CELLS_SUCCEEDED:
      return state.concat(action.payload);

    case LOAD_CELLS_SUCCEEDED:
      return action.payload;

    default:
      return state;
  }
};
