import { IFilterValue, IFilterDescription } from '../filter';
import {
  ICell, CellWrap, IView, ICellDescription,
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

  static CreateViewData(rowCount: number, columnCount: number): ICellDescription[][] {
    const rows: ICellDescription[][] = [];
    for (let i = 0; i < rowCount;) {
      const r = new Array(columnCount);
      for (let j = 0; j < columnCount;) {
        r[j] = ModelDescriptionConverter.CreateCellDescription(null, null, i, j);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }

  static CreateEditorData(
    rowFilter: IFilterDescription,
    columnFilter: IFilterDescription,
    cellDescriptions: ICellDescription[],
    cells: ICell[],
  ): ICell[][] {
    // persons["p1"] = { firstName: "F1", lastName: "L1" };
    // persons["p2"] = { firstName: "F2" };

    // eslint-disable-next-line no-debugger
    debugger;

    const rowFilterValues = rowFilter.values;
    const colFilterValues = columnFilter.values;

    let cellsTmp = cells.map((c) => new CellWrap(c));
    const cellDescriptionDictionary: { [id: string]: ICellDescription} = {};

    cellDescriptions.forEach((elm: ICellDescription): void => {
      const key = `${elm.rowIndex}_${elm.columnIndex}`;
      cellDescriptionDictionary[key] = elm;
    });

    function cellCtor(rIndex: number, cIndex: number): ICell {
      const rFilterVal = rowFilterValues[rIndex];
      const cFilterVal = colFilterValues[cIndex];
      const idx = cellsTmp.findIndex((item: CellWrap): boolean => item.ContainsFilterValue(rFilterVal.id) && item.ContainsFilterValue(cFilterVal.id));
      if (idx !== -1) {
        const result = cellsTmp[idx].cell;
        cellsTmp = cellsTmp.slice(idx, 1);
        return result;
      }

      const cellDescr = cellDescriptionDictionary[`${rIndex}_${cIndex}`];
      const filterVals = [rFilterVal, cFilterVal];
      // create from view
      if (cellDescr) {
        return ModelDescriptionConverter.CreateCell(cellDescr.value, cellDescr.formula, filterVals);
      }

      // create empty
      return ModelDescriptionConverter.CreateCell(null, null, filterVals);
    }

    const rowCount = rowFilterValues.length + 1;
    const columnCount = colFilterValues.length + 1;
    const rows: Array<ICell[]> = new Array(rowCount);

    // create row with headers
    const r0 = new Array(columnCount);
    r0[0] = ModelDescriptionConverter.CreateCell(null, null, null);
    for (let k = 1; k < columnCount;) {
      r0[k] = ModelDescriptionConverter.CreateCell(colFilterValues[k - 1].name, null, null);
      k += 1;
    }
    rows[0] = r0;

    for (let i = 1; i < rowCount;) {
      const r = new Array(columnCount);
      // create row header
      r[0] = ModelDescriptionConverter.CreateCell(rowFilterValues[i - 1].name, null, null);
      for (let j = 1; j < columnCount;) {
        r[j] = cellCtor(i, j);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }
}
