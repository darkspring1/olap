export const LOAD_MODEL_DESCRIPTION_REQUESTED = 'LOAD_MODEL_DESCRIPTION_REQUESTED';
export const LOAD_MODEL_DESCRIPTION_SUCCEEDED = 'LOAD_MODEL_DESCRIPTION_SUCCEEDED';
export const LOAD_MODEL_DESCRIPTION_FAILED = 'LOAD_MODEL_DESCRIPTION_FAILED';

export const SAVE_MODEL_DESCRIPTION_REQUESTED = 'SAVE_MODEL_DESCRIPTION_REQUESTED';
export const SAVE_MODEL_DESCRIPTION_SUCCEEDED = 'SAVE_MODEL_DESCRIPTION_SUCCEEDED';
export const SAVE_MODEL_DESCRIPTION_FAILED = 'SAVE_MODEL_DESCRIPTION_FAILED';

export const SAVE_MODEL_DATA_REQUESTED = 'SAVE_MODEL_DATA_REQUESTED';
export const SAVE_MODEL_DATA_SUCCEEDED = 'SAVE_MODEL_DATA_SUCCEEDED';
export const SAVE_MODEL_DATA_FAILED = 'SAVE_MODEL_DATA_FAILED';

export interface ICellDescription {

    readonly value: string;

    readonly formula: string;

    readonly rowIndex: number;

    readonly columnIndex: number;
}

export interface IView {
    readonly name: string;
    readonly rowFilters: string[];
    readonly columnFilters: string[];
    // cells with formulas and hardcoded values
    readonly cellsDescription: ICellDescription[];
}

export interface IModelDescription {
    readonly name: string;
    readonly defaultView: IView;
// eslint-disable-next-line semi
}

export interface ILoadModelDescriptionRequest {
    modelId: string;
}

export interface IModelState {
    readonly description: IModelDescription;
    readonly data: any;
}
