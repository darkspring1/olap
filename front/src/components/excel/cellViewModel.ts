import { ICellDescription } from '../../store/model';

export default class CellViewModel {
  constructor(cell: ICellDescription, grid: CellViewModel[][]) {
    this.cell = cell;
    this.editValue = cell.value || '';
    this.grid = grid;
  }

    readonly grid: CellViewModel[][]

    readonly cell: ICellDescription;

    isEditable: boolean;

    editValue: string;
}
