import IAction from 'store/iAction.ts';
import { IModelDescription } from './modelDescription.ts';
import {
  LOAD_MODEL_DESCRIPTION_REQUESTED,
  LOAD_MODEL_DESCRIPTION_SUCCEEDED,
  LOAD_MODEL_DESCRIPTION_FAILED,
  SAVE_MODEL_DESCRIPTION_REQUESTED,
  SAVE_MODEL_DESCRIPTION_SUCCEEDED,
  SAVE_MODEL_DESCRIPTION_FAILED,
  ILoadModelDescriptionRequest,
  ISaveModelDescriptionPayload,
} from './types.ts';

export function loadModelDescriptionRequested(modelId: string): IAction<ILoadModelDescriptionRequest> {
  const payload: ILoadModelDescriptionRequest = { modelId };
  return {
    type: LOAD_MODEL_DESCRIPTION_REQUESTED,
    payload,
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

export function saveModelDescriptionRequested(modelName: string, data: any[][]): IAction<ISaveModelDescriptionPayload> {
  const payload: IAction<ISaveModelDescriptionPayload> = { modelName, data };
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
