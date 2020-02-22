import { ICell } from 'store/model';

/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
export default class CellViewModel {
  constructor(cell: ICell, grid: CellViewModel[][]) {
    this.cell = cell;
    this.editValue = cell.value || '';
    this.grid = grid;
  }

    readonly grid: CellViewModel[][]

    readonly cell: ICell;

    isEditable: boolean;

    editValue: string;
}
