import { IFilterValue } from '../filter';

export const LOAD_MODEL_DESCRIPTION_REQUESTED = 'LOAD_MODEL_DESCRIPTION_REQUESTED';
export const LOAD_MODEL_DESCRIPTION_SUCCEEDED = 'LOAD_MODEL_DESCRIPTION_SUCCEEDED';
export const LOAD_MODEL_DESCRIPTION_FAILED = 'LOAD_MODEL_DESCRIPTION_FAILED';

export const SAVE_MODEL_DESCRIPTION_REQUESTED = 'SAVE_MODEL_DESCRIPTION_REQUESTED';
export const SAVE_MODEL_DESCRIPTION_SUCCEEDED = 'SAVE_MODEL_DESCRIPTION_SUCCEEDED';
export const SAVE_MODEL_DESCRIPTION_FAILED = 'SAVE_MODEL_DESCRIPTION_FAILED';

export const SAVE_MODEL_DATA_REQUESTED = 'SAVE_MODEL_DATA_REQUESTED';
export const SAVE_MODEL_DATA_SUCCEEDED = 'SAVE_MODEL_DATA_SUCCEEDED';
export const SAVE_MODEL_DATA_FAILED = 'SAVE_MODEL_DATA_FAILED';


// for view
export interface ICellDescription {

  value: string;

  formula: string;

  readonly rowIndex: number;

  readonly columnIndex: number;
}

// real cell with data
export interface ICell {
  readonly id: string;
  readonly value: string;
  readonly formula: string;
  readonly filterValues: IFilterValue[];
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

export interface IModelState {
  readonly description: IModelDescription;
  readonly data: any;
}
