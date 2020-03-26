/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, takeEvery, put } from 'redux-saga/effects';

import { loadFilterValues } from '../api/api';
import { loadFiltersSucceeded, loadFiltersFailed, IFilterDescription } from '../store/filter';
import { IAction } from '../store';
import { LOAD_FILTERS_REQUESTED } from '../store/filter/types';


export function* loadFilters(filterSystemNames: string[]) {
  try {
    const response: IFilterDescription[] = yield call(loadFilterValues, filterSystemNames);
    yield put(loadFiltersSucceeded(response));
  } catch (e) {
    yield put(loadFiltersFailed());
  }
}

function* loadFiltersWorker(action: IAction<string[]>) {
  yield loadFilters(action.payload);
}

export default function* loadFiltersSaga() {
  yield takeEvery(LOAD_FILTERS_REQUESTED, loadFiltersWorker);
}
