/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import { IModelDescription } from '../../store/model';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
    readonly modelId: string;
    modelDescription: IModelDescription;
}

interface IEditorDispatchProps {
  onDataLoad: (modelId: string) => void;
  onSaveModel: (modelId: string, data: any[][]) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

class Editor extends React.Component<IEditorProps, {}> {
  modelName: string

  constructor(props: IEditorOwnProps) {
    super(props);
    this.modelName = props.modelName;
  }

  onSaveModel(): void {
    const { onSaveModel } = this.props;
    // onSaveModel(modelId, data);
  }

  render() {
    const {
      modelDescription,
    } = this.props;


    if (!modelDescription) {
      return <>loading...</>;
    }
    return (
      <>
        model view
      </>
    );
  }
}

export {
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
