/* eslint-disable no-debugger */
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

export interface IFilterModel
{
  selectedId: string;
  selectedIndex: number;
  readonly filter: IFilterDescription;
}

export interface IViewModel {
  readonly rowFilters: IFilterDescription;
  readonly columnFilters: IFilterDescription;
  // cells with formulas and hardcoded values
  readonly cellsDescription: ICellDescription[];
  readonly filters: IFilterModel[];
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IEditorOwnProps {
  // data cells
  readonly cells: ICell[];
  readonly view: IViewModel;
}

interface IEditorDispatchProps {
  onCellsLoad: (filters: IFilterModel[]) => void;
  onSave: (data: ICell[]) => void;
}

type IEditorProps = IEditorOwnProps & IEditorDispatchProps;

interface IEditorState {
  data: ICellModel[][];
}

class Editor extends React.Component<IEditorProps, IEditorState> {
  modelName: string

  data: ICellModel[][];

  constructor(props: IEditorProps) {
    super(props);
    this.modelName = '';
    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
  }

  getCellFilterValue(f: IFilterDescription, valIdx: number): ICellFilterValue {
    return {
      filterSystemName: f.systemName,
      id: f.values[valIdx].id,
    };
  }

  getFilters(cell: ICellModel): ICellFilterValue[] {
    const {
      view,
    } = this.props;

    const {
      rowFilters, columnFilters, filters,
    } = view;

    const result = filters.map((f) => this.getCellFilterValue(f.filter, f.selectedIndex));
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
    const { onCellsLoad, view } = this.props;
    const { filters } = view;
    const selected = filters.find((x) => x.filter.systemName === filterSystemName);
    selected.selectedIndex = selected.filter.values.findIndex((v) => v.id === selectedId);
    selected.selectedId = selectedId;
    onCellsLoad(filters);
  }

  render() {
    const {
      cells,
      view,
    } = this.props;

    if (!view) {
      return <>loading...</>;
    }

    const {
      rowFilters,
      columnFilters,
      filters,
      cellsDescription,
    } = view;

    this.data = EditorHelper.CreateEditorData(rowFilters, columnFilters, cellsDescription, cells);
    const rowHeaders = rowFilters.values.map((x) => x.value);
    const colHeaders = columnFilters.values.map((x) => x.value);

    const renderFilters = (): any => filters.map((f) => {
      const fValues = f.filter.values.map((x: IFilterValue): IFilterOption<IFilterValue> => ({ id: x.id, name: x.value }));
      return (
        <FilterSelect
          key={f.filter.systemName}
          values={fValues}
          onchange={(selectedId: string): void => this.change(f.filter.systemName, selectedId)}
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
  IEditorProps, IEditorOwnProps, IEditorDispatchProps, Editor,
};
