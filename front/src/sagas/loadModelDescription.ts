import {
  call, takeEvery, put, all,
} from 'redux-saga/effects';
import { loadModelDescription, loadFilterValues, loadCells } from '../api/api';
import { IAction } from '../store';
import { LOAD_MODEL_DESCRIPTION_REQUESTED, IView } from '../store/model/types';
import { IModelDescription, loadModelDescriptionSucceeded, loadModelDescriptionFailed } from '../store/model';
import { loadFiltersSucceeded, IFilterDescription } from '../store/filter';
import { ICellFilterValue, ICell, ICellsState } from '../store/cell/types';
import { loadCellsSucceeded } from '../store/cell/actions';

function distinct<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

async function loadViewCells(view: IView, filters: IFilterDescription[]): Promise<ICellsState> {
  const viewFilters = filters.filter((x) => view
    .filters
    .some((vf) => vf === x.systemName));

  const cellFilterValues = viewFilters.map((x): ICellFilterValue => ({
    filterSystemName: x.systemName,
    filterValueId: x.values[0].id,
  }));

  const cells = await loadCells(view.id, cellFilterValues);

  return { viewId: view.id, cells };
}

function* loadModelDescriptionWorker(action: IAction<string>) {
  try {
    const response: IModelDescription = yield call(loadModelDescription, action.payload);
    const { views } = response;

    let filters: string[] = [];

    views.forEach((v) => {
      filters = v
        .columnFilters
        .concat(v.rowFilters)
        .concat(v.filters)
        .concat(filters);
    });

    filters = distinct(filters);

    const filterResponse: IFilterDescription[] = yield call(loadFilterValues, filters);

    const cellPromises = views.map((v): Promise<ICellsState> => loadViewCells(v, filterResponse));

    const cellsResponse: ICellsState[] = yield call(() => Promise.all(cellPromises));

    const puts: any[] = [
      put(loadFiltersSucceeded(filterResponse)),
      put(loadModelDescriptionSucceeded(response))];

    cellsResponse.forEach((payload) => {
      const effect = put(loadCellsSucceeded(payload));
      puts.push(effect);
    });

    yield all(puts);
  } catch (e) {
    yield put(loadModelDescriptionFailed());
  }
}

export default function* loadModelDescriptionSaga() {
  yield takeEvery(LOAD_MODEL_DESCRIPTION_REQUESTED, loadModelDescriptionWorker);
}
