/* eslint-disable no-debugger */
import {
  call, takeEvery, put,
} from 'redux-saga/effects';
import { loadCells } from '../api/api';
import { IAction } from '../store';
import { loadModelDescriptionFailed } from '../store/model';
import { ILoadCellsPayload, LOAD_CELLS_REQUESTED, ICell } from '../store/cell/types';
import { loadCellsSucceeded } from '../store/cell/actions';

function* loadCellsWorker(action: IAction<ILoadCellsPayload>) {
  try {
    const cells: ICell[] = yield call(loadCells, action.payload.viewId, action.payload.filterValues);
    yield put(loadCellsSucceeded({ viewId: action.payload.viewId, cells }));
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadCellsSaga() {
  yield takeEvery(LOAD_CELLS_REQUESTED, loadCellsWorker);
}
