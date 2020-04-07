import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { saveModelDescriptionRequested, IModelDescription } from '../store/model';
import { IBuilderDispatchProps, IBuilderOwnProps, Builder } from '../components/modelBuilder/builder';
import { loadFiltersRequested, IFilterDescription } from '../store/filter';
import { IState } from '../store';

const fyFilterSystemName = 'f_4ff2cd71-7abe-431b-b2e9-fef48637d056';
const rowFilterSystemName = 'f_6e019251-b27a-4499-85f3-ca2578c5a7a3';
const colFilterSystemName = 'f_a1c18c15-e28b-4448-811f-98d52a4f43bf';

function mapStateToProps(state: IState, ownProps: any): IBuilderOwnProps {
  let rowFilter: IFilterDescription = null;
  let columnFilter: IFilterDescription = null;
  let fyFilter: IFilterDescription = null;

  if (state.filters.length === 3) {
    fyFilter = state.filters.find((x) => x.systemName === fyFilterSystemName);
    columnFilter = state.filters.find((x) => x.systemName === colFilterSystemName);
    rowFilter = state.filters.find((x) => x.systemName === rowFilterSystemName);

    if (!(fyFilter && columnFilter && rowFilterSystemName)) {
      throw new Error('now filters');
    }
  }

  return {
    modelName: 'New model',
    rowFilter,
    columnFilter,
    otherFilters: [fyFilter],
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
      const action = loadFiltersRequested([
        fyFilterSystemName,
        colFilterSystemName,
        rowFilterSystemName]);
      return dispatch(action);
    },
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Builder));
