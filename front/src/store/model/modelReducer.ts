import { IAction } from 'store/base/iAction.ts';
import { SAVE_MODEL_DESCRIPTION_SUCCEEDED, IModelState, LOAD_MODEL_DESCRIPTION_SUCCEEDED } from './types.ts';
import IModelDescription from './modelDescription.ts';

const initialState: IModelState = {
  description: null,
  data: null,
};

function reduceLoadModelDescription(action: IAction<IModelDescription>): IModelState {
  return { description: action.payload };
}

export default (state: IModelState = initialState, action: IAction<any>): IModelState => {
  switch (action.type) {
    case SAVE_MODEL_DESCRIPTION_SUCCEEDED:
      return { ...state, ...action.payload };

    case LOAD_MODEL_DESCRIPTION_SUCCEEDED:
      return { ...state, ...reduceLoadModelDescription(action) };

    default:
      return state;
  }
};
