/* eslint-disable no-debugger */
/* eslint-disable no-underscore-dangle */
export default class CellViewModel {
  constructor(id: string, value: string, grid: CellViewModel[][]) {
    this.id = id;
    this.value = value || '';
    this.editValue = value || '';
    this.grid = grid;
  }

    private formula: string;

    readonly grid: CellViewModel[][]

    readonly id: string;

    isEditable: boolean;

    value: string;

    editValue: string;
}
