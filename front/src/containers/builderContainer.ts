import { connect } from 'react-redux';
import * as Redux from 'redux';
import { updateModelDescriptionRequested } from 'actions';
import {
  Builder, IBuilderOwnProps, ModelDescription, IBuilderDispatchProps,
} from 'components/modelBuilder';

// import { IBuilderProps } from '../components/modelBuilder/builder';

function getData(modelBuilder: any): any[][] {
  if (modelBuilder && modelBuilder.data) {
    return modelBuilder.data;
  }

  const data = [
    ['Lada', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13],
  ];

  return data;
}

function mapStateToProps(state: any, ownProps: any): IBuilderOwnProps {
  return {
    data: getData(state.modelBuilder),
  };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IBuilderOwnProps): IBuilderDispatchProps {
  return {
    onUpdateModel: (modelDescription: ModelDescription) => {
      const action = updateModelDescriptionRequested(modelDescription);
      return dispatch(action);
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Builder);
