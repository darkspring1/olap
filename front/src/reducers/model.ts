import { IAction } from 'store/base/iAction.ts';
import { IModelDescription, SAVE_MODEL_DESCRIPTION_SUCCEEDED } from 'store/model';

const modelReducer = (state = {}, action: IAction<IModelDescription>): IModelDescription => {
  switch (action.type) {
    case SAVE_MODEL_DESCRIPTION_SUCCEEDED:
      // eslint-disable-next-line no-case-declarations
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default modelReducer;
