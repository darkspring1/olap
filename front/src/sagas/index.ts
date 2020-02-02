/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
import { call, takeEvery, put } from 'redux-saga/effects';
import { updateModelDescription, ICreateModelResponse } from 'api/api';
import { IAction, ActionTypes } from 'actions';
import { ModelDescription } from 'components/modelBuilder';
import { push } from 'react-router-redux';

// воркер Saga: будет запускаться на действия типа `USER_FETCH_REQUESTED`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* updateModelDescriptionWorker(action: IAction<ModelDescription>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: ICreateModelResponse = yield call(updateModelDescription, action.payload);
    debugger;
    yield put(push(`/model/${response.id}`));
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

/*
  Запускаем `updateModelDescription` на каждое задиспатченное действие `USER_FETCH_REQUESTED`.
  Позволяет одновременно получать данные пользователей.
*/
function* UpdateModelDescriptionSaga() {
  yield takeEvery(ActionTypes.UpdateModelDescriptionRequested, updateModelDescriptionWorker);
}


export default UpdateModelDescriptionSaga;
