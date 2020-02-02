import { ActionTypes } from './actionTypes'
import { ModelDescription } from 'components/modelBuilder/modelDescription';

interface IAction<T> {
  type: string
  payload: T
}

function updateModelDescriptionRequested(modelDescription: ModelDescription): IAction<ModelDescription> {
  return {
    type: ActionTypes.UpdateModelDescriptionRequested,
    payload: modelDescription
  }
}


export { updateModelDescriptionRequested, ActionTypes, IAction }


