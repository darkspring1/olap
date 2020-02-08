import { all } from 'redux-saga/effects';
import saveModelDescriptionSaga from './saveModelDescription.ts';
import loadModelDescriptionSaga from './loadModelDescription.ts';

export default function* rootSaga() {
  yield all([
    saveModelDescriptionSaga(),
    loadModelDescriptionSaga(),
  ]);
}
