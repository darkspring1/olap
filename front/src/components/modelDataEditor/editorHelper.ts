// eslint-disable-next-line max-classes-per-file
import { IFilterDescription } from '../../store/filter';
import { ICellDescription } from '../../store/model';
import { ICell } from '../../store/cell/types';
import ICellModel from '../excel/cellModel';
import CellWrap from './cellWrap';
import uuidv4 from '../../common/uuid';

export default class EditorHelper {
  private static CreateCell(id: string, value: string, formula: string, rowIndex: number, columnIndex: number): ICellModel {
    return {
      id,
      value,
      formula,
      rowIndex,
      columnIndex,
    };
  }

  static CreateEditorData(
    rowFilter: IFilterDescription,
    columnFilter: IFilterDescription,
    cellDescriptions: ICellDescription[],
    cells: ICell[],
  ): ICellModel[][] {
    const rowFilterValues = rowFilter.values;
    const colFilterValues = columnFilter.values;

    let cellsTmp = cells.map((c) => new CellWrap(c));
    const cellDescriptionDictionary: { [id: string]: ICellDescription} = {};

    cellDescriptions.forEach((elm: ICellDescription): void => {
      const key = `${elm.rowIndex}_${elm.columnIndex}`;
      cellDescriptionDictionary[key] = elm;
    });

    function cellCtor(rIndex: number, cIndex: number): ICellModel {
      const rFilterVal = rowFilterValues[rIndex];
      const cFilterVal = colFilterValues[cIndex];
      const idx = cellsTmp.findIndex((item: CellWrap): boolean => item.ContainsFilterValue(rFilterVal.id) && item.ContainsFilterValue(cFilterVal.id));
      if (idx !== -1) {
        const result = cellsTmp[idx].cell;
        cellsTmp = cellsTmp.slice(idx, 1);
        return EditorHelper.CreateCell(result.id, result.value, result.formula, rIndex, cIndex);
      }

      const cellDescr = cellDescriptionDictionary[`${rIndex}_${cIndex}`];
      // const filterVals = [rFilterVal, cFilterVal];
      // create from view
      if (cellDescr) {
        return EditorHelper.CreateCell(uuidv4(), cellDescr.value, cellDescr.formula, rIndex, cIndex);
      }

      // create empty
      return EditorHelper.CreateCell(uuidv4(), null, null, rIndex, cIndex);
    }

    const rowCount = rowFilterValues.length;
    const columnCount = colFilterValues.length;
    const rows: Array<ICellModel[]> = new Array(rowCount);

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
