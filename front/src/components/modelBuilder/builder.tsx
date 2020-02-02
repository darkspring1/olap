
import * as React from 'react'
import Grid from 'components/spreadsheets/grid'
import modelDescriptionConverter from './modelDescriptionConverter'
import { ModelDescription } from './modelDescription'

export interface IBuilderOwnProps {
    data: any[][];
}

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
    const modelDescription = modelDescriptionConverter.FromData(this.modelName, this.props.data);
    this.props.onUpdateModel(modelDescription);
  }

  render() {
    return (
      <>
        <Grid data={this.props.data} width={300} height={300} />
        <button onClick={() => this.onUpdateModel()}>Update Model</button>
      </>
    );
  }
}

export { IBuilderProps, Builder }