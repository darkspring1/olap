
export const SAVE_FILTERS_DESCRIPTION_REQUESTED = 'SAVE_FILTERS_DESCRIPTION_REQUESTED';
export const SAVE_FILTERS_DESCRIPTION_SUCCEEDED = 'SAVE_FILTERS_DESCRIPTION_SUCCEEDED';
export const SAVE_FILTERS_DESCRIPTION_FAILED = 'SAVE_FILTERS_DESCRIPTION_FAILED';

export const LOAD_FILTERS_REQUESTED = 'LOAD_FILTERS_DESCRIPTION_REQUESTED';
export const LOAD_FILTERS_SUCCEEDED = 'LOAD_FILTERS_DESCRIPTION_SUCCEEDED';
export const LOAD_FILTERS_FAILED = 'LOAD_FILTERS_DESCRIPTION_FAILED';


export interface IFilterValue {
    readonly name: string;
    readonly order: number;
}

export interface IFilterDescription {
    readonly name: string;
    readonly systemName: string;
    readonly values: IFilterValue[];
}

export interface ISaveFiltersDescriptionRequest {
    filters: IFilterDescription[];
}
