import {
  call, takeEvery, put, all,
} from 'redux-saga/effects';
import { loadModelDescription, loadFilterValues, loadCells } from '../api/api';
import { IAction } from '../store';
import { LOAD_MODEL_DESCRIPTION_REQUESTED } from '../store/model/types';
import { IModelDescription, loadModelDescriptionSucceeded, loadModelDescriptionFailed } from '../store/model';
import { loadFiltersSucceeded, IFilterDescription } from '../store/filter';
import { ICellFilterValue } from '../store/cell/types';
import { loadCellsSucceeded } from '../store/cell/actions';


function* loadModelDescriptionWorker(action: IAction<string>) {
  try {
    const response: IModelDescription = yield call(loadModelDescription, action.payload);
    const { defaultView } = response;
    let filters = defaultView.columnFilters.concat(defaultView.rowFilters);
    filters = filters.concat(defaultView.filters);
    const filterResponse: IFilterDescription[] = yield call(loadFilterValues, filters);

    const viewFilters = filterResponse.filter((x) => defaultView
      .filters
      .some((vf) => vf === x.systemName));

    const cellFilterValues = viewFilters.map((x): ICellFilterValue => ({
      filterSystemName: x.systemName,
      filterValueId: x.values[0].id,
    }));

    const cellsResponse = yield call(loadCells, response.defaultView.id, cellFilterValues);

    yield all([
      put(loadCellsSucceeded(cellsResponse)),
      put(loadFiltersSucceeded(filterResponse)),
      put(loadModelDescriptionSucceeded(response))]);
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadModelDescriptionSaga() {
  yield takeEvery(LOAD_MODEL_DESCRIPTION_REQUESTED, loadModelDescriptionWorker);
}
