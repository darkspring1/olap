import { IModelDescription } from 'common/modelDescription';
import ActionTypes from './actionTypes.ts';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAction<T> {
  type: string;
  payload: T;
}

class UpdateModelDescriptionPayload {
  readonly modelName: string

  readonly data: any[][]

  constructor(modelName: string, data: any[][]) {
    this.modelName = modelName;
    this.data = data;
  }
}

// eslint-disable-next-line max-len
function updateModelDescriptionRequested(modelName: string, data: any[][]): IAction<UpdateModelDescriptionPayload> {
  return {
    type: ActionTypes.UpdateModelDescriptionRequested,
    payload: new UpdateModelDescriptionPayload(modelName, data),
  };
}


function updateModelDescriptionSucceeded(payload: IModelDescription): IAction<IModelDescription> {
  return {
    type: ActionTypes.UpdateModelDescriptionSucceeded,
    payload,
  };
}


export {
  updateModelDescriptionRequested,
  updateModelDescriptionSucceeded,
  UpdateModelDescriptionPayload,
  ActionTypes,
  IAction,
};
