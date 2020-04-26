import IAction from '../iAction';
import { LOAD_FILTERS_SUCCEEDED } from './types';
import { IFilterDescription } from '.';

type StateType = { [id: string]: IFilterDescription };

function saveToStore(state: StateType, payload: IFilterDescription[]): StateType {
  payload.forEach((d) => {
    // eslint-disable-next-line no-param-reassign
    state[d.systemName] = d;
  });

  return { ...state };
}

const initialState: StateType = {};

export default (state: StateType = initialState, action: IAction<any>): StateType => {
  switch (action.type) {
    case LOAD_FILTERS_SUCCEEDED:
      return saveToStore(state, action.payload);

    default:
      return state;
  }
};
