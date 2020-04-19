import { ICell, ICellFilterValue } from '../../store/cell/types';

export default class CellWrap {
  constructor(cell: ICell) {
    this.cell = cell;
  }

  readonly cell: ICell;

  private _cellDictionary: { [id: string]: ICellFilterValue };

  ContainsFilterValue(filterValueId: string): boolean {
    if (!this._cellDictionary) {
      this._cellDictionary = {};
      this.cell.filterValues.forEach((element) => {
        this._cellDictionary[element.id] = element;
      });
    }
    return !!this._cellDictionary[filterValueId];
  }
}
