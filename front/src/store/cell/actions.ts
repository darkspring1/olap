
import {
  LOAD_CELLS_REQUESTED,
  ILoadCellsPayload,
  ICell,
  LOAD_CELLS_SUCCEEDED,
  LOAD_CELLS_FAILED,
  SAVE_CELLS_REQUESTED,
  SAVE_CELLS_SUCCEEDED,
  SAVE_CELLS_FAILED,
  ISaveCellsPayload,
  ICellsState,
} from './types';

import IAction from '../iAction';

export function loadCellsRequested(payload: ILoadCellsPayload): IAction<ILoadCellsPayload> {
  return {
    type: LOAD_CELLS_REQUESTED,
    payload,
  };
}

export function loadCellsSucceeded(payload: ICellsState): IAction<ICellsState> {
  return {
    type: LOAD_CELLS_SUCCEEDED,
    payload,
  };
}

export function loadCellsFailed(): IAction<any> {
  return {
    type: LOAD_CELLS_FAILED,
    payload: null,
  };
}

export function saveCellsRequested(payload: ISaveCellsPayload): IAction<ISaveCellsPayload> {
  return {
    type: SAVE_CELLS_REQUESTED,
    payload,
  };
}


export function saveCellsSucceeded(): IAction<ICell[]> {
  return {
    type: SAVE_CELLS_SUCCEEDED,
    payload: null,
  };
}

export function saveCellsFailed(): IAction<any> {
  return {
    type: SAVE_CELLS_FAILED,
    payload: null,
  };
}
