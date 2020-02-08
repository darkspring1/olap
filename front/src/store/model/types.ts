import IModelDescription from './modelDescription.ts';

export const LOAD_MODEL_DESCRIPTION_REQUESTED = 'LOAD_MODEL_DESCRIPTION_REQUESTED';
export const LOAD_MODEL_DESCRIPTION_SUCCEEDED = 'LOAD_MODEL_DESCRIPTION_SUCCEEDED';
export const LOAD_MODEL_DESCRIPTION_FAILED = 'LOAD_MODEL_DESCRIPTION_FAILED';

export const SAVE_MODEL_DESCRIPTION_REQUESTED = 'SAVE_MODEL_DESCRIPTION_REQUESTED';
export const SAVE_MODEL_DESCRIPTION_SUCCEEDED = 'SAVE_MODEL_DESCRIPTION_SUCCEEDED';
export const SAVE_MODEL_DESCRIPTION_FAILED = 'SAVE_MODEL_DESCRIPTION_FAILED';

export interface ILoadModelDescriptionRequest {
    modelId: string;
}

export class ISaveModelDescriptionPayload {
    readonly modelName: string;

    readonly data: any[][];
}

export interface IModelState {
    readonly description: IModelDescription;
    readonly data: any;
}
