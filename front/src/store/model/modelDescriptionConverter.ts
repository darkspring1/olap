import uuid from 'common/uuid';
import { IFilterValue, IFilterDescription } from '../filter';
import { IModelDescription, IView, ICellDescription } from '.';


export default class ModelDescriptionConverter {
  private static CreateCell(value: string, formula: string, rowIndex: number, columnIndex: number): ICellDescription {
    return {
      value, formula, rowIndex, columnIndex,
    };
  }


  static CreateView(name: string, rowFilters: string[], columnFilters: string[], data: ICellDescription[][]): IView {
    const view: IView = {
      name, rowFilters, columnFilters, cellsDescription: [],
    };
    const rowCount = data.length;
    const columnCount = data[0].length;

    for (let i = 1; i < rowCount; i += 1) {
      for (let j = 1; j < columnCount; j += 1) {
        if (data[i][j].value || data[i][j].formula) {
          view.cellsDescription.push(data[i][j]);
        }
      }
    }

    return view;
  }

  static ToData(modelDescription: IModelDescription): ICell[][] {
    const rowCount: number = modelDescription.rows.length;
    const columnCount: number = modelDescription.columns.length;
    const rows: any[] = new Array(rowCount + 1);

    const r0 = new Array(columnCount + 1);
    r0[0] = ModelDescriptionConverter.CreateCell(null, null);
    for (let k = 0; k < columnCount;) {
      r0[k + 1] = ModelDescriptionConverter.CreateCell(modelDescription.columns[k].caption, null);
      k += 1;
    }
    rows[0] = r0;

    for (let i = 0; i < rowCount;) {
      const r = new Array(columnCount + 1);
      r[0] = ModelDescriptionConverter.CreateCell(modelDescription.rows[i].caption, null);
      for (let j = 0; j < columnCount;) {
        r[j + 1] = ModelDescriptionConverter.CreateCell(null, null);
        j += 1;
      }
      rows[i + 1] = r;
      i += 1;
    }
    return rows;
  }

  static CreateData(rowFilter: IFilterDescription, columnFilter: IFilterDescription): ICellDescription[][] {
    const rowCount = rowFilter.values.length + 1;
    const columnCount = columnFilter.values.length + 1;
    const rows: Array<ICellDescription[]> = new Array(rowCount);

    const r0 = new Array(columnCount);
    r0[0] = ModelDescriptionConverter.CreateCell(null, null, 0, 0);
    for (let k = 1; k < columnCount;) {
      r0[k] = ModelDescriptionConverter.CreateCell(columnFilter.values[k - 1].name, null, 0, k);
      k += 1;
    }
    rows[0] = r0;

    for (let i = 1; i < rowCount;) {
      const r = new Array(columnCount);
      r[0] = ModelDescriptionConverter.CreateCell(rowFilter.values[i - 1].name, null, i, 0);
      for (let j = 1; j < columnCount;) {
        r[j] = ModelDescriptionConverter.CreateCell(null, null, i, j);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }
}
