import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { saveModelDescriptionRequested, ModelDescriptionConverter } from 'store/model';
import {
  Builder, IBuilderOwnProps, IBuilderDispatchProps,
} from 'components/modelBuilder';

function getData(modelBuilder: any): any[][] {
  if (modelBuilder && modelBuilder.data) {
    return modelBuilder.data;
  }
  return ModelDescriptionConverter.CreateEmptyData(20, 20);
}

function mapStateToProps(state: any, ownProps: any): IBuilderOwnProps {
  return {
    modelName: 'New model',
    data: getData(state.modelBuilder),
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IBuilderOwnProps): IBuilderDispatchProps {
  return {
    onSaveModel: (modelName: string, data: any[][]) => {
      const action = saveModelDescriptionRequested(modelName, data);
      return dispatch(action);
    },
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Builder));
