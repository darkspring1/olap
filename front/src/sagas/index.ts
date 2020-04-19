import { all } from 'redux-saga/effects';
import saveModelDescriptionSaga from './saveModelDescription';
import loadModelDescriptionSaga from './loadModelDescription';
import loadFiltersSaga from './loadFilters';
import loadCellsSaga from './loadCells';
import saveCellsSaga from './saveCells';

export default function* rootSaga() {
  yield all([
    saveModelDescriptionSaga(),
    loadModelDescriptionSaga(),
    loadFiltersSaga(),
    loadCellsSaga(),
    saveCellsSaga(),
  ]);
}
