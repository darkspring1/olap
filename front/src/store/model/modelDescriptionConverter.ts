// eslint-disable-next-line max-classes-per-file
import { IFilterValue } from '../filter';
import {
  ICell, IView, ICellDescription,
} from './types';
import uuid from '../../common/uuid';


export default class ModelDescriptionConverter {
  private static CreateCellDescription(value: string, formula: string, rowIndex: number, columnIndex: number): ICellDescription {
    return {
      value, formula, rowIndex, columnIndex,
    };
  }

  private static CreateCell(value: string, formula: string, filterValues: IFilterValue[]): ICell {
    return {
      id: uuid(),
      value,
      formula,
      filterValues,
    };
  }

  static CreateView(name: string, rowFilters: string[], columnFilters: string[], data: ICellDescription[][]): IView {
    const view: IView = {
      name, rowFilters, columnFilters, cellsDescription: [],
    };
    const rowCount = data.length;
    const columnCount = data[0].length;

    for (let i = 0; i < rowCount; i += 1) {
      for (let j = 0; j < columnCount; j += 1) {
        if (data[i][j].value || data[i][j].formula) {
          view.cellsDescription.push(data[i][j]);
        }
      }
    }

    return view;
  }
}
