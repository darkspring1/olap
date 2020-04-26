export const SAVE_CELLS_REQUESTED = 'SAVE_CELLS_REQUESTED';
export const SAVE_CELLS_SUCCEEDED = 'SAVE_CELLS_SUCCEEDED';
export const SAVE_CELLS_FAILED = 'SAVE_CELLS_FAILED';

export const LOAD_CELLS_REQUESTED = 'LOAD_CELLS_REQUESTED';
export const LOAD_CELLS_SUCCEEDED = 'LOAD_CELLS_SUCCEEDED';
export const LOAD_CELLS_FAILED = 'LOAD_CELLS_FAILED';

export interface ILoadCellsPayload {
  readonly viewId: string;
  readonly filterValues: ICellFilterValue[];
}

export interface ISaveCellsPayload {
  readonly modelId: string;
  readonly cells: ICell[];
}

export interface ICellsState {
  readonly viewId: string;
  readonly cells: ICell[];
}

export interface ICellFilterValue {
  readonly filterSystemName: string;
  readonly filterValueId: string;
}

// real cell with data
export interface ICell {
  readonly id: string;
  readonly value: string;
  readonly formula: string;
  readonly filterValues: ICellFilterValue[];
}
