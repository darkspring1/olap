import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { saveModelDescriptionRequested } from 'store/model';
import {
  Builder, IBuilderOwnProps, IBuilderDispatchProps,
} from 'components/modelBuilder';

function createEmptyData(rowCount: number, columnCount: number): any[][] {
  const rows: any[] = new Array(rowCount);

  for (let i = 0; i < rowCount;) {
    const r = new Array(columnCount);
    for (let j = 0; j < columnCount;) {
      r[j] = null;
      j += 1;
    }
    rows[i] = r;
    i += 1;
  }
  return rows;
}

function getData(modelBuilder: any): any[][] {
  if (modelBuilder && modelBuilder.data) {
    return modelBuilder.data;
  }
  return createEmptyData(10, 10);
}

function mapStateToProps(state: any, ownProps: any): IBuilderOwnProps {
  return {
    data: getData(state.modelBuilder),
  };
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IBuilderOwnProps): IBuilderDispatchProps {
  return {
    onUpdateModel: (modelName: string, data: any[][]) => {
      const action = saveModelDescriptionRequested(modelName, data);
      return dispatch(action);
    },
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Builder));
