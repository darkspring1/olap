import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../store';
import {
  IEditorOwnProps, IEditorDispatchProps, IViewProps,
} from '../components/modelDataEditor/editor';
import { loadModelDescriptionRequested } from '../store/model';
import { IFilterDescription } from '../store/filter';
import { ICell, ILoadCellsPayload, ICellFilterValue } from '../store/cell/types';
import { loadCellsRequested, saveCellsRequested } from '../store/cell/actions';
import EditorWrap from './editorWrap';


let viewId: string = null;
type OwnProps = {
  match: {
    params: {
      id: string;
    };
  };
};

function mapStateToProps(state: IState, ownProps: OwnProps): IEditorOwnProps {
  const { description } = state.model;
  const { cells } = state;
  let rowFilters: IFilterDescription = null;
  let columnFilters: IFilterDescription = null;
  let filters: IFilterDescription[] = null;
  const defaultView = description ? description.defaultView : null;

  if (!defaultView) {
    return {
      view: null,
      cells,
    };
  }

  viewId = defaultView.id;
  rowFilters = state.filters.find((x) => x.systemName === defaultView.rowFilters[0]);
  columnFilters = state.filters.find((x) => x.systemName === defaultView.columnFilters[0]);

  filters = state
    .filters
    .filter((x) => x.systemName === defaultView.filters[0]);


  const viewModel: IViewProps = {
    cellsDescription: defaultView ? defaultView.cellsDescription : null,
    columnFilters,
    rowFilters,
    filters,
  };

  return {
    view: viewModel,
    cells,
  };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: OwnProps): IEditorDispatchProps {
  // load data for editor
  const action = loadModelDescriptionRequested(ownProps.match.params.id);
  dispatch(action);

  return {
    onCellsLoad: (filterValues: ICellFilterValue[]): void => {
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
