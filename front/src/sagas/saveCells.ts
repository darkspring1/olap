import {
  call, takeEvery, put,
} from 'redux-saga/effects';
import { saveCells } from '../api/api';
import { IAction } from '../store';
import { loadModelDescriptionFailed } from '../store/model';
import { SAVE_CELLS_REQUESTED, ISaveCellsPayload } from '../store/cell/types';
import { saveCellsSucceeded } from '../store/cell/actions';

function* saveCellsWorker(action: IAction<ISaveCellsPayload>) {
  try {
    yield call(saveCells, action.payload.modelId, action.payload.cells);
    yield put(saveCellsSucceeded());
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* saveCellsSaga() {
  yield takeEvery(SAVE_CELLS_REQUESTED, saveCellsWorker);
}
