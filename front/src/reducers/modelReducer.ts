/* eslint-disable no-debugger */

import { ActionTypes, IAction } from 'actions/';
import { IModelDescription } from 'common/modelDescription';

const initialState: IModelDescription = {
  name: 'New model',
};

// eslint-disable-next-line max-len
const modelReducer = (state = initialState, action: IAction<IModelDescription>): IModelDescription => {
  switch (action.type) {
    case ActionTypes.UpdateModelDescriptionSucceeded:
      debugger;
      // eslint-disable-next-line no-case-declarations
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default modelReducer;
