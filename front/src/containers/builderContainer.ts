import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { ModelDescriptionConverter, saveModelDescriptionRequested } from '../store/model';
import { IBuilderDispatchProps, IBuilderOwnProps, Builder } from '../components/modelBuilder/builder';
import { loadFiltersRequested, IFilterDescription } from '../store/filter';

function getData(filters: IFilterDescription[]): any[][] {
  if (filters.length === 2) {
    return ModelDescriptionConverter.CreateEmptyData(filters[0], filters[1]);
  }
  return null;
}

function mapStateToProps(state: any, ownProps: any): IBuilderOwnProps {
  return {
    modelName: 'New model',
    data: getData(state.filters),
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IBuilderOwnProps): IBuilderDispatchProps {
  return {
    onSaveModel: (modelName: string, data: any[][]) => {
      const action = saveModelDescriptionRequested(modelName, data);
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
