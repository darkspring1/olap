/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
import { call, takeEvery, put } from 'redux-saga/effects';
import history from 'browserHistory';
import { saveModelDescription, ICreateModelResponse } from 'api/api';
import { IAction } from 'store';
import {
  ISaveModelDescriptionPayload,
  IModelDescription,
  ModelDescriptionConverter,
  saveModelDescriptionSucceeded,
  saveModelDescriptionFailed,
} from 'store/model';
import { SAVE_MODEL_DESCRIPTION_REQUESTED } from 'store/model/types.ts';

function* saveModelDescriptionWorker(action: IAction<ISaveModelDescriptionPayload>) {
  try {
    const { modelName, data } = action.payload;
    const modelDescription: IModelDescription = ModelDescriptionConverter.FromData(modelName, data);
    const response: ICreateModelResponse = yield call(saveModelDescription, modelDescription);
    yield put(saveModelDescriptionSucceeded());
    history.push(`/model/${response.id}/data`);
  } catch (e) {
    yield put(saveModelDescriptionFailed());
    throw e;
  }
}

export default function* saveModelDescriptionSaga() {
  yield takeEvery(SAVE_MODEL_DESCRIPTION_REQUESTED, saveModelDescriptionWorker);
}
