/* eslint-disable no-debugger */
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { updateModelDescriptionRequested } from 'actions';
import { withRouter } from 'react-router-dom';
import { Editor, IEditorOwnProps, IEditorDispatchProps } from '../components/modelDataEditor/editor.tsx';

// import { IBuilderProps } from '../components/modelBuilder/builder';

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
  debugger;
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


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor));
