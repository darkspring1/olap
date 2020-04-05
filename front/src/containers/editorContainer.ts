import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../store';
import { IEditorOwnProps, Editor, IEditorDispatchProps } from '../components/modelDataEditor/editor';
import { loadModelDescriptionRequested } from '../store/model';
import { IFilterDescription, loadFiltersRequested } from '../store/filter';


type OwnProps = {
  match: {
    params: {
      id: string;
    };
  };
  loadModelDescription: boolean;
};

function mapStateToProps(state: IState, ownProps: OwnProps): IEditorOwnProps {
  const { description } = state.model;
  let rowFilters: IFilterDescription = null;
  let columnFilters: IFilterDescription = null;
  const defaultView = description ? description.defaultView : null;

  if (!defaultView) {
    // eslint-disable-next-line no-param-reassign
    ownProps.loadModelDescription = true;
  } else {
    rowFilters = state.filters.find((x) => x.systemName === defaultView.rowFilters[0]);
    columnFilters = state.filters.find((x) => x.systemName === defaultView.columnFilters[0]);
  }

  const props: IEditorOwnProps = {
    modelId: ownProps.match.params.id,
    cellsDescription: defaultView ? defaultView.cellsDescription : null,
    columnFilters,
    rowFilters,
  };

  return props;
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: OwnProps): IEditorDispatchProps {
  // load data for editor
  const action = loadModelDescriptionRequested(ownProps.match.params.id);
  dispatch(action);

  return {
    onDataLoad: (modelId: string): void => null,
    onSaveModel: (modelId: string, data: any[][]): void => null
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor));
