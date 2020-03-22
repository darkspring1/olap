
import {
  LOAD_MODEL_DESCRIPTION_REQUESTED,
  LOAD_MODEL_DESCRIPTION_SUCCEEDED,
  LOAD_MODEL_DESCRIPTION_FAILED,
  SAVE_MODEL_DESCRIPTION_REQUESTED,
  SAVE_MODEL_DESCRIPTION_SUCCEEDED,
  SAVE_MODEL_DESCRIPTION_FAILED,
} from './types';
import { IModelDescription } from '.';
import IAction from '../iAction';

export function loadModelDescriptionRequested(modelId: string): IAction<string> {
  return {
    type: LOAD_MODEL_DESCRIPTION_REQUESTED,
    payload: modelId,
  };
}

export function loadModelDescriptionSucceeded(payload: IModelDescription): IAction<IModelDescription> {
  return {
    type: LOAD_MODEL_DESCRIPTION_SUCCEEDED,
    payload,
  };
}

export function loadModelDescriptionFailed(): IAction<any> {
  return {
    type: LOAD_MODEL_DESCRIPTION_FAILED,
    payload: null,
  };
}

export function saveModelDescriptionRequested(payload: IModelDescription): IAction<IModelDescription> {
  return {
    type: SAVE_MODEL_DESCRIPTION_REQUESTED,
    payload,
  };
}


export function saveModelDescriptionSucceeded(): IAction<any> {
  return {
    type: SAVE_MODEL_DESCRIPTION_SUCCEEDED,
    payload: null,
  };
}

export function saveModelDescriptionFailed(): IAction<any> {
  return {
    type: SAVE_MODEL_DESCRIPTION_FAILED,
    payload: null,
  };
}
