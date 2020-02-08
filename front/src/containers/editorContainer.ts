import { connect } from 'react-redux';
import * as Redux from 'redux';
import { loadModelDescriptionRequested, IModelDescription, ModelDescriptionConverter } from 'store/model';
import { withRouter } from 'react-router-dom';
import { Editor, IEditorOwnProps, IEditorDispatchProps } from '../components/modelDataEditor/editor.tsx';
import IState from '../store/iState.ts';

function mapStateToProps(state: IState, ownProps: any): IEditorOwnProps {
  const props: IEditorOwnProps = { modelId: ownProps.match.params.id };

  const description: IModelDescription = state?.model?.description;
  if (description) {
    props.isEmpty = false;
    props.modelName = description.modelName;
    props.data = ModelDescriptionConverter.ToData(state.model.description);
  } else {
    props.isEmpty = true;
  }
  return props;
}


function mapDispatchToProps(dispatch: Redux.Dispatch<any>,
  ownProps: IEditorOwnProps): IEditorDispatchProps {
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
