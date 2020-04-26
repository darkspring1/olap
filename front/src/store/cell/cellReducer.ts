
import IAction from '../iAction';
import { LOAD_CELLS_SUCCEEDED, ICellsState } from './types';

type StateType = { [id: string]: ICellsState };

const initialState: StateType = {};

function saveToStore(state: StateType, payload: ICellsState): StateType {
  // eslint-disable-next-line no-param-reassign
  state[payload.viewId] = payload;

  return { ...state };
}

export default (state: StateType = initialState, action: IAction<any>): StateType => {
  switch (action.type) {
    case LOAD_CELLS_SUCCEEDED:
      return saveToStore(state, action.payload);

    default:
      return state;
  }
};
