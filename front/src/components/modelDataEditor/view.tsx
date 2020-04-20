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
  readonly rowFilters: IFilterDescription;
  readonly columnFilters: IFilterDescription;
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
  data: ICellModel[][];

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

  getFilters(cell: ICellModel): ICellFilterValue[] {
    const {
      rowFilters,
      columnFilters,
      filters: propsFilters,
    } = this.props;

    const { filters } = this.state;


    const result = propsFilters.map((f): ICellFilterValue => ({ filterSystemName: f.systemName, filterValueId: filters[f.systemName] }));
    const rFilter = this.getCellFilterValue(rowFilters, cell.rowIndex);
    const cFilter = this.getCellFilterValue(columnFilters, cell.columnIndex);

    result.push(rFilter);
    result.push(cFilter);
    return result;
  }

  save(): void {
    const {
      onSave,
    } = this.props;
    const nonEmptyCells: ICellModel[] = [];
    this.data.forEach((r) => {
      r.forEach((c) => {
        if (c.value || c.formula) {
          nonEmptyCells.push(c);
        }
      });
    });

    const cells = nonEmptyCells.map((c: ICellModel): ICell => {
      const filterValues = this.getFilters(c);
      return {
        id: c.id, formula: c.formula, value: c.value, filterValues,
      };
    });

    if (cells.length > 0) {
      onSave(cells);
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

    // eslint-disable-next-line no-debugger
    debugger;
    this.data = EditorHelper.CreateEditorData(rowFilters, columnFilters, cellsDescription, cells);
    const rowHeaders = rowFilters.values.map((x) => x.value);
    const colHeaders = columnFilters.values.map((x) => x.value);

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
        <Grid data={this.data} rowHeaders={rowHeaders} columnHeaders={colHeaders} />
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
