import { call, takeEvery, put } from 'redux-saga/effects';
import { loadModelDescription } from '../api/api';
import { IAction } from '../store';
import { LOAD_MODEL_DESCRIPTION_REQUESTED } from '../store/model/types';
import { IModelDescription, loadModelDescriptionSucceeded, loadModelDescriptionFailed } from '../store/model';
import { loadFilters } from './loadFilters';


function* loadModelDescriptionWorker(action: IAction<string>) {
  try {
    const response: IModelDescription = yield call(loadModelDescription, action.payload);
    const filters = [response.defaultView.columnFilters[0], response.defaultView.rowFilters[0]];
    yield loadFilters(filters);
    yield put(loadModelDescriptionSucceeded(response));
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadModelDescriptionSaga() {
  yield takeEvery(LOAD_MODEL_DESCRIPTION_REQUESTED, loadModelDescriptionWorker);
}
