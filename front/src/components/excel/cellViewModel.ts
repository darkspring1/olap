import ICellModel from './cellModel';

export default class CellViewModel {
  constructor(cell: ICellModel, grid: CellViewModel[][]) {
    this.cell = cell;
    this.editValue = cell.value || '';
    this.grid = grid;
  }

    readonly grid: CellViewModel[][]

    readonly cell: ICellModel;

    isEditable: boolean;

    editValue: string;
}
