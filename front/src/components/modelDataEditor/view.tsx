/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import { ICellDescription } from '../../store/model';
import { Grid } from '../excel/grid';
import { IFilterDescription, IFilterValue } from '../../store/filter';
import { ICell, ICellFilterValue } from '../../store/cell/types';
import ICellModel from '../excel/cellModel';
import EditorHelper from './editorHelper';
import FilterSelect, { IFilterOption } from '../filter/filter';

interface IViewOwnProps {
  readonly cells: ICell[];
  readonly rowFilters: IFilterDescription[];
  readonly columnFilters: IFilterDescription[];
  // cells with formulas and hardcoded values
  readonly cellsDescription: ICellDescription[];
  readonly filters: IFilterDescription[];
}

interface IViewDispatchProps {
  onCellsLoad: (filters: ICellFilterValue[]) => void;
  onSave: (data: ICell[]) => void;
}

type IViewProps = IViewOwnProps & IViewDispatchProps;

interface IViewState {
  filters: { [id: string]: string };
}

class View extends React.Component<IViewProps, IViewState> {
  data: ICellModel<ICell>[][];

  constructor(props: IViewProps) {
    super(props);
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);


    const filters: { [id: string]: string } = {};

    props
      .filters.forEach((x) => {
        filters[x.systemName] = x.values[0].id;
      });

    this.state = { filters };
  }

  getCellFilterValue(f: IFilterDescription, valIdx: number): ICellFilterValue {
    return {
      filterSystemName: f.systemName,
      filterValueId: f.values[valIdx].id,
    };
  }

  getFilters(cell: ICellModel<ICell>): ICellFilterValue[] {
    const {
      rowFilters,
      columnFilters,
      filters: propsFilters,
    } = this.props;

    const { filters } = this.state;


    const result = propsFilters.map((f): ICellFilterValue => ({ filterSystemName: f.systemName, filterValueId: filters[f.systemName] }));
    // const rFilter = this.getCellFilterValue(rowFilters, cell.rowIndex);
    // const cFilter = this.getCellFilterValue(columnFilters, cell.columnIndex);

    // result.push(rFilter);
    // result.push(cFilter);
    return result;
  }

  save(): void {
    const {
      onSave,
    } = this.props;
    const nonEmptyCells: ICell[] = [];
    this.data.forEach((r) => {
      r.forEach((c) => {
        if (c.value || c.formula) {
          nonEmptyCells.push({
            id: c.attached.id, value: c.value, formula: c.formula, filterValues: c.attached.filterValues,
          });
        }
      });
    });

    if (nonEmptyCells.length > 0) {
      onSave(nonEmptyCells);
    }
  }

  change(filterSystemName: string, selectedId: string): void {
    const { onCellsLoad } = this.props;
    const { filters } = this.state;
    filters[filterSystemName] = selectedId;

    const cellFilters = Object
      .keys(filters)
      .map((k): ICellFilterValue => ({ filterSystemName: k, filterValueId: filters[filterSystemName] }));

    onCellsLoad(cellFilters);
  }

  render() {
    const {
      cells,
      rowFilters,
      columnFilters,
      filters,
      cellsDescription,
    } = this.props;

    const { filters: stateFilters } = this.state;

    const rPivotHeaders = EditorHelper.GetGroupedHeaders(rowFilters);
    const cPivotHeaders = EditorHelper.GetGroupedHeaders(columnFilters);

    const selectedFilters = Object.keys(stateFilters).map((filterSystemName): ICellFilterValue => ({ filterSystemName, filterValueId: stateFilters[filterSystemName] }));
    this.data = EditorHelper.CreateEditorData(rPivotHeaders, cPivotHeaders, selectedFilters, cellsDescription, cells);

    const renderFilters = (): any => filters.map((f) => {
      const fValues = f.values.map((x: IFilterValue): IFilterOption<IFilterValue> => ({ id: x.id, name: x.value }));
      return (
        <FilterSelect
          key={f.systemName}
          values={fValues}
          onchange={(selectedId: string): void => this.change(f.systemName, selectedId)}
        />
      );
    });

    return (
      <>
        {renderFilters()}
        <Grid data={this.data} rowPivotGroupedHeaders={rPivotHeaders} columnPivotGroupedHeaders={cPivotHeaders} />
        <button onClick={this.save}>Save data</button>
      </>
    );
  }
}

export {
  // eslint-disable-next-line no-undef
  IViewProps, IViewOwnProps, IViewDispatchProps,
  View,
};
