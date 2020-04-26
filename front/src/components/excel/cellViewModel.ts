import ICellModel from './cellModel';

export default class CellViewModel<TAttached> {
  constructor(cell: ICellModel<TAttached>, grid: CellViewModel<TAttached>[][]) {
    this.cell = cell;
    this.editValue = cell.value || '';
    this.grid = grid;
  }

  readonly grid: CellViewModel<TAttached>[][]

  readonly cell: ICellModel<TAttached>;

  isEditable: boolean;

  editValue: string;
}
