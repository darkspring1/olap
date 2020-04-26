import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { saveModelDescriptionRequested, IModelDescription } from '../store/model';
import { IBuilderDispatchProps, IBuilderOwnProps, Builder } from '../components/modelBuilder/builder';
import { loadFiltersRequested, IFilterDescription } from '../store/filter';
import { IState } from '../store';

const fyFilterSystemName = 'f_77ddfb85-af47-4cad-9c42-c5c14aeff00c';
const rowFilterSystemName = 'f_675da1b3-b3a9-44ca-8092-3fed6cbeb3f5';
const colFilterSystemName = 'f_ae1dd3c5-b91b-4f42-a74c-6d5a940ea3ee';

function mapStateToProps(state: IState, ownProps: any): IBuilderOwnProps {
  let rowFilter: IFilterDescription = null;
  let columnFilter: IFilterDescription = null;
  let fyFilter: IFilterDescription = null;

  if (Object.keys(state.filters).length === 3) {
    fyFilter = state.filters[fyFilterSystemName];
    columnFilter = state.filters[colFilterSystemName];
    rowFilter = state.filters[rowFilterSystemName];

    if (!(fyFilter && columnFilter && rowFilterSystemName)) {
      throw new Error('now filters');
    }
  }

  return {
    modelName: 'New model',
    rowFilter,
    columnFilter,
    filters: [fyFilter],
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
