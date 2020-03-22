import { call, takeEvery, put } from 'redux-saga/effects';
import { loadModelDescription } from 'api/api';
import { IAction } from '../store';
import { LOAD_MODEL_DESCRIPTION_REQUESTED } from '../store/model/types';
import { IModelDescription, loadModelDescriptionSucceeded, loadModelDescriptionFailed } from '../store/model';


function* loadModelDescriptionWorker(action: IAction<string>) {
  try {
    const response: IModelDescription = yield call(loadModelDescription, action.payload);
    yield put(loadModelDescriptionSucceeded(response));
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadModelDescriptionSaga() {
  yield takeEvery(LOAD_MODEL_DESCRIPTION_REQUESTED, loadModelDescriptionWorker);
}
