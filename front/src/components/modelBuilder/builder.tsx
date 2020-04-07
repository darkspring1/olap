/* eslint-disable react/button-has-type */
import * as React from 'react';
import { Grid } from '../excel/grid';
import { IFilterDescription, IFilterValue } from '../../store/filter';
import { ModelDescriptionConverter, IModelDescription, ICellDescription } from '../../store/model';
import ICellModel from '../excel/cellModel';
import Filter, { IFilterProps } from '../filter/filter';

interface IBuilderState {
  modelName: string;
}

export interface IBuilderOwnProps {
  modelName: string;
  rowFilter: IFilterDescription;
  columnFilter: IFilterDescription;
  otherFilters: IFilterDescription[];
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

  private createViewData(): ICellModel[][] {
    const rows: ICellDescription[][] = [];
    const { rowFilter, columnFilter } = this.props;

    for (let i = 0; i < rowFilter.values.length;) {
      const r = new Array(columnFilter.values.length);
      for (let j = 0; j < columnFilter.values.length;) {
        r[j] = {
          rowIndex: i,
          columnIndex: j,
          value: null,
          formula: null,
        };
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }

  render() {
    const { state } = this;
    const {
      onLoadData, rowFilter, columnFilter, otherFilters,
    } = this.props;

    if (!rowFilter) {
      onLoadData();
      return (<>loading...</>);
    }

    const rowHeaders = rowFilter.values.map((x) => x.name);
    const colHeaders = columnFilter.values.map((x) => x.name);

    const data = this.createViewData();

    const renderFilters = function (): any {
      return otherFilters.map((f) => {
        const fValues = f.values.map((x: IFilterValue): string => x.name);
        return <Filter values={fValues} />;
      });
    };

    return (
      <>
        {renderFilters()}
        <input type="text" value={state.modelName} onChange={this.onChange} />
        <Grid data={data} rowHeaders={rowHeaders} columnHeaders={colHeaders} />
        <button onClick={() => this.onSaveModel(data)}>Save Model</button>
      </>
    );
  }
}

// eslint-disable-next-line no-undef
export { IBuilderProps, Builder };
