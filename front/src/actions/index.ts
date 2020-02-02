import ModelDescription from 'components/modelBuilder/modelDescription.ts';
import ActionTypes from './actionTypes.ts';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAction<T> {
  type: string;
  payload: T;
}

// eslint-disable-next-line max-len
function updateModelDescriptionRequested(modelDescription: ModelDescription): IAction<ModelDescription> {
  return {
    type: ActionTypes.UpdateModelDescriptionRequested,
    payload: modelDescription,
  };
}


export { updateModelDescriptionRequested, ActionTypes, IAction };
