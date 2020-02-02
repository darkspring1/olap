/* eslint-disable react/button-has-type */

import * as React from 'react';
import Grid from 'components/spreadsheets/grid';
import modelDescriptionConverter from './modelDescriptionConverter.ts';
import ModelDescription from './modelDescription.ts';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IBuilderOwnProps {
    data: any[][];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IBuilderDispatchProps {
  onUpdateModel: (modelDescription: ModelDescription) => void;
}

type IBuilderProps = IBuilderOwnProps & IBuilderDispatchProps;

class Builder extends React.Component<IBuilderProps, {}> {
  modelName: string

  constructor(props: IBuilderProps) {
    super(props);
    this.modelName = 'New model';
  }

  onUpdateModel(): void {
    const { data, onUpdateModel } = this.props;
    const modelDescription = modelDescriptionConverter.FromData(this.modelName, data);
    onUpdateModel(modelDescription);
  }

  render() {
    const { data } = this.props;
    return (
      <>
        <Grid data={data} width={300} height={300} />
        <button onClick={() => this.onUpdateModel()}>Update Model</button>
      </>
    );
  }
}

export { IBuilderProps, Builder };