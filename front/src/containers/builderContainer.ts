import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { saveModelDescriptionRequested, IModelDescription } from '../store/model';
import { IBuilderDispatchProps, IBuilderOwnProps, Builder } from '../components/modelBuilder/builder';
import { loadFiltersRequested, IFilterDescription } from '../store/filter';
import { IState } from '../store';

function mapStateToProps(state: IState, ownProps: any): IBuilderOwnProps {
  let rowFilter: IFilterDescription = null;
  let columnFilter: IFilterDescription = null;

  if (state.filters.length === 2) {
    [columnFilter, rowFilter] = state.filters;
  }

  return {
    modelName: 'New model',
    rowFilter,
    columnFilter,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IBuilderOwnProps): IBuilderDispatchProps {
  return {
    onSaveModel: (payload: IModelDescription) => {
      const action = saveModelDescriptionRequested(payload);
      return dispatch(action);
    },

    onLoadData: () => {
      const action = loadFiltersRequested(['f_6e019251-b27a-4499-85f3-ca2578c5a7a3', 'f_a1c18c15-e28b-4448-811f-98d52a4f43bf']);
      return dispatch(action);
    },
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Builder));
