/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, takeEvery, put } from 'redux-saga/effects';
import history from 'common/browserHistory';
import { saveModelDescription } from 'api/api';

import {
  IModelDescription,
  saveModelDescriptionSucceeded,
  saveModelDescriptionFailed,
} from '../store/model';

import { SAVE_MODEL_DESCRIPTION_REQUESTED } from '../store/model/types.ts';
import { IAction } from '../store';

function* saveModelDescriptionWorker(action: IAction<IModelDescription>) {
  try {
    const modelId: string = yield call(saveModelDescription, action.payload);
    yield put(saveModelDescriptionSucceeded());
    history.push(`/model/${modelId}/data`);
  } catch (e) {
    yield put(saveModelDescriptionFailed());
    throw e;
  }
}

export default function* saveModelDescriptionSaga() {
  yield takeEvery(SAVE_MODEL_DESCRIPTION_REQUESTED, saveModelDescriptionWorker);
}
