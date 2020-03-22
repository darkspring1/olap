/* eslint-disable react/button-has-type */
import * as React from 'react';
import { Grid } from '../excel/grid';
import { IFilterDescription } from '../../store/filter';
import { ModelDescriptionConverter, IModelDescription } from '../../store/model';

interface IBuilderState {
  modelName: string;
}

export interface IBuilderOwnProps {
    modelName: string;
    rowFilter: IFilterDescription;
    columnFilter: IFilterDescription;
}

export interface IBuilderDispatchProps {
  onSaveModel: (payload: IModelDescription) => void;
  onLoadData: () => void;
}

type IBuilderProps = IBuilderOwnProps & IBuilderDispatchProps;

class Builder extends React.Component<IBuilderProps, IBuilderState> {
  constructor(props: IBuilderProps) {
    super(props);
    this.state = { modelName: props.modelName };

    this.onChange = this.onChange.bind(this);
  }

  onSaveModel(data: ICellDescription[][]): void {
    const { onSaveModel, rowFilter, columnFilter } = this.props;
    const { modelName } = this.state;

    const defaultView = ModelDescriptionConverter.CreateView('default', [rowFilter.systemName], [columnFilter.systemName], data);

    const modelDescription: IModelDescription = { name: modelName, defaultView };
    onSaveModel(modelDescription);
  }

  onChange(e: any): void {
    this.setState({ modelName: e.target.value });
  }

  render() {
    const { state } = this;
    const { onLoadData, rowFilter, columnFilter } = this.props;

    if (!rowFilter) {
      onLoadData();
      return (<>loading...</>);
    }

    const data = ModelDescriptionConverter.CreateData(rowFilter, columnFilter);

    return (
      <>
        <input type="text" value={state.modelName} onChange={this.onChange} />
        <Grid data={data} />
        <button onClick={() => this.onSaveModel(data)}>Save Model</button>
      </>
    );
  }
}

export { IBuilderProps, Builder };
