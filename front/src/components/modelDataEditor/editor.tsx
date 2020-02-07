/* eslint-disable react/button-has-type */

import * as React from 'react';
import Grid from 'components/spreadsheets/grid';

import { IModelDescription } from 'common/modelDescription';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
    data: any[][];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorDispatchProps {
  onUpdateModel: (modelDescription: IModelDescription) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

class Editor extends React.Component<IEditorProps, {}> {
  modelName: string

  constructor(props: IEditorOwnProps) {
    super(props);
    this.modelName = 'New model';
  }

  render() {
    const { data } = this.props;
    return (
      <>
        <Grid data={data} width={600} height={300} />
      </>
    );
  }
}

export {
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
