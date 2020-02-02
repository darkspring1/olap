import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as api from 'api/api'
import { IAction, ActionTypes } from 'actions'
import { ModelDescription } from '../components/modelBuilder'

// воркер Saga: будет запускаться на действия типа `USER_FETCH_REQUESTED`
function* updateModelDescription(action: IAction<ModelDescription>) {
   try {
      const user = yield call(api.updateModelDescription, action.payload);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Запускаем `updateModelDescription` на каждое задиспатченное действие `USER_FETCH_REQUESTED`.
  Позволяет одновременно получать данные пользователей.
*/
function* UpdateModelDescriptionSaga() {
  yield takeEvery(ActionTypes.UpdateModelDescriptionRequested, updateModelDescription);
}


export default UpdateModelDescriptionSaga;