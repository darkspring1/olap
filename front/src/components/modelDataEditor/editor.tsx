/* eslint-disable react/button-has-type */
import * as React from 'react';
import Grid from 'components/spreadsheets/grid';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
    modelId: string;
    isEmpty: boolean;
    modelName: string;
    data: any[][];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorDispatchProps {
  onDataLoad: (modelId: string) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

class Editor extends React.Component<IEditorProps, {}> {
  modelName: string

  constructor(props: IEditorOwnProps) {
    super(props);
    this.modelName = props.modelName;
  }

  render() {
    const {
      data, modelName, isEmpty, modelId, onDataLoad,
    } = this.props;

    let content = null;
    if (isEmpty) {
      content = (<div>loading...</div>);
      onDataLoad(modelId);
    } else {
      content = (
        <>
          <h2>{modelName}</h2>
          <Grid data={data} width={600} height={300} />
        </>
      );
    }

    return (
      <>
        {content}
      </>
    );
  }
}

export {
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
