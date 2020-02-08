/* eslint-disable react/button-has-type */
import * as React from 'react';
import Grid from 'components/spreadsheets/grid';

interface IBuilderState {
  modelName: string;
}

export interface IBuilderOwnProps {
    data: any[][];
    modelName: string;
}

export interface IBuilderDispatchProps {
  onSaveModel: (modelName: string, data: any[][]) => void;
}

type IBuilderProps = IBuilderOwnProps & IBuilderDispatchProps;

class Builder extends React.Component<IBuilderProps, IBuilderState> {
  constructor(props: IBuilderProps) {
    super(props);
    this.state = { modelName: props.modelName };

    this.onChange = this.onChange.bind(this);
  }

  onSaveModel(): void {
    const { data, onSaveModel } = this.props;
    const { modelName } = this.state;
    onSaveModel(modelName, data);
  }

  onChange(e: any): void {
    this.setState({ modelName: e.target.value });
  }

  render() {
    const { state } = this;
    const { data } = this.props;
    return (
      <>
        <input type="text" value={state.modelName} onChange={this.onChange} />
        <Grid data={data} width={1200} height={500} />
        <button onClick={() => this.onSaveModel()}>Save Model</button>
      </>
    );
  }
}

export { IBuilderProps, Builder };
