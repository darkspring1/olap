import { connect } from 'react-redux';
import * as Redux from 'redux';
import { withRouter } from 'react-router-dom';
import { IState } from '../store';
import { IEditorOwnProps, Editor, IEditorDispatchProps } from '../components/modelDataEditor/editor';
import { loadModelDescriptionRequested } from '../store/model';

let load: boolean;

type OwnProps = {
  match: {
    params: {
      id: string;
    };
  };
};

function mapStateToProps(state: IState, ownProps: OwnProps): IEditorOwnProps {
  const props: IEditorOwnProps = {
    modelId: ownProps.match.params.id,
    modelDescription: state.model.description,
  };

  load = !state.model.description;

  return props;
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: OwnProps): IEditorDispatchProps {
  if (load) {
    const action = loadModelDescriptionRequested(ownProps.match.params.id);
    dispatch(action);
  }

  return {
    onDataLoad: (modelId: string) => {
      const action = loadModelDescriptionRequested(modelId);
      return dispatch(action);
    },
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor));
