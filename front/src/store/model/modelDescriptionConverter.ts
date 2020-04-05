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

    const rowCount = rowFilterValues.length;
    const columnCount = colFilterValues.length;
    const rows: Array<ICell[]> = new Array(rowCount);

    for (let i = 0; i < rowCount;) {
      const r = new Array(columnCount);
      for (let j = 0; j < columnCount;) {
        r[j] = cellCtor(i, j);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }
}
