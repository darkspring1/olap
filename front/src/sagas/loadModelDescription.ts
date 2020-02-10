import { call, takeEvery, put } from 'redux-saga/effects';

import { loadModelDescription } from 'api/api';

import { IAction } from 'store';
import {
  IModelDescription,
  ILoadModelDescriptionRequest,
  loadModelDescriptionSucceeded,
  loadModelDescriptionFailed,
} from 'store/model';

import { LOAD_MODEL_DESCRIPTION_REQUESTED } from 'store/model/types.ts';


function* loadModelDescriptionWorker(action: IAction<ILoadModelDescriptionRequest>) {
  try {
    const response: IModelDescription = yield call(loadModelDescription, action.payload.modelId);
    yield put(loadModelDescriptionSucceeded(response));
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadModelDescriptionSaga() {
  yield takeEvery(LOAD_MODEL_DESCRIPTION_REQUESTED, loadModelDescriptionWorker);
}
