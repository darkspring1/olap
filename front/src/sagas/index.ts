/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
import { call, takeEvery, put } from 'redux-saga/effects';
import history from 'browserHistory';
import { updateModelDescription, ICreateModelResponse } from 'api/api';
import {
  IAction, ActionTypes, UpdateModelDescriptionPayload, updateModelDescriptionSucceeded,
} from 'actions';
import { IModelDescription, modelDescriptionConverter } from 'common/modelDescription';

// воркер Saga: будет запускаться на действия типа `USER_FETCH_REQUESTED`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* updateModelDescriptionWorker(action: IAction<UpdateModelDescriptionPayload>) {
  const { modelName, data } = action.payload;
  const modelDescription: IModelDescription = modelDescriptionConverter.FromData(modelName, data);
  const response: ICreateModelResponse = yield call(updateModelDescription, modelDescription);
  history.push(`/model/${response.id}/data`);
}

/*
  Запускаем `updateModelDescription` на каждое задиспатченное действие `USER_FETCH_REQUESTED`.
  Позволяет одновременно получать данные пользователей.
*/
function* UpdateModelDescriptionSaga() {
  yield takeEvery(ActionTypes.UpdateModelDescriptionRequested, updateModelDescriptionWorker);
}

export default UpdateModelDescriptionSaga;
