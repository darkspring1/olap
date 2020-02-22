/* eslint-disable no-debugger */
import CellView from './cellView.tsx';
import CellEdit from './cellEdit.tsx';

/* eslint-disable no-underscore-dangle */
export default class CellViewModel {
  constructor(id: string, value: string, formula: string, grid: CellViewModel[][], cellView: CellView, cellEdit: CellEdit) {
    this.isEditable = false;
    this.id = id;
    this.value = value || '';
    this.editValue = value || '';
    this.grid = grid;
    this.DataEditor = cellEdit;
    this.DataViewer = cellView;
    this.formula = formula;
  }

    private formula: string;

    readonly grid: CellViewModel[][]

    readonly id: string;

    readonly DataEditor: CellEdit;

    readonly DataViewer: CellView;

    isEditable: boolean;

    value: string;

    editValue: string;
}
