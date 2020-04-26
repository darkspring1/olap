import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../store';
import {
  IViewOwnProps,
} from '../components/modelDataEditor/view';
import { loadModelDescriptionRequested, IView } from '../store/model';
import { ICell, ILoadCellsPayload, ICellFilterValue } from '../store/cell/types';
import { loadCellsRequested, saveCellsRequested } from '../store/cell/actions';
import EditorWrap, { IModelEditorDispatchProps, IModelEditorOwnProps, IViewInfo } from './modelEditor';

type OwnProps = {
  match: {
    params: {
      id: string;
    };
  };
};

function createViewProps(state: IState, view: IView): IViewOwnProps {
  const { cells } = state;

  const rowFilters = view.rowFilters.map((f) => (state.filters[f]));
  const columnFilters = view.columnFilters.map((f) => (state.filters[f]));
  const filters = view.filters.map((f) => (state.filters[f]));

  return {
    cellsDescription: view.cellsDescription,
    columnFilters,
    rowFilters,
    filters,
    cells: cells[view.id].cells,
    debug: false,
  };
}

function mapStateToProps(state: IState, ownProps: OwnProps): IModelEditorOwnProps {
  const { model, cells, filters } = state;
  const { description } = model;

  if (!description || Object.keys(cells).length === 0 || Object.keys(filters).length === 0) {
    return {
      modelName: null,
      views: null,
    };
  }

  return {
    modelName: description.name,
    views: description.views.filter((v) => cells[v.id]).map((v) => ({ id: v.id, props: createViewProps(state, v) })),
  };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: OwnProps): IModelEditorDispatchProps {
  // load data for editor
  const action = loadModelDescriptionRequested(ownProps.match.params.id);
  dispatch(action);

  return {
    onCellsLoad: (viewId: string, filterValues: ICellFilterValue[]): void => {
      const payload: ILoadCellsPayload = { viewId, filterValues };
      dispatch(loadCellsRequested(payload));
    },
    onSave: (cells: ICell[]): void => {
      dispatch(saveCellsRequested({ modelId: ownProps.match.params.id, cells }));
    },
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorWrap));
