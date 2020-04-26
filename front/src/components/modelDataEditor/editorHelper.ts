// eslint-disable-next-line max-classes-per-file
import { IFilterDescription, IFilterValue } from '../../store/filter';
import { ICellDescription } from '../../store/model';
import { ICell } from '../../store/cell/types';
import ICellModel from '../excel/cellModel';
import CellWrap from './cellWrap';
import uuidv4 from '../../common/uuid';
import { IPivotHeaderGrouped, PivotHeaderGrouped } from '../excel/PivotHeaderGroup';

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

  private static BuildGrouped(i: number, j: number, filters: IFilterDescription[]): IPivotHeaderGrouped[] {
    if (i >= filters.length) {
      return [];
    }
    const f = filters[i];
    return f.values.map((fv): IPivotHeaderGrouped => {
      const childs = EditorHelper.BuildGrouped(j, j + 1, filters);
      return new PivotHeaderGrouped(f.systemName, fv.id, fv.value, childs);
    });
  }

  public static GetGroupedHeaders(filters: IFilterDescription[]): IPivotHeaderGrouped[] {
    const result: IPivotHeaderGrouped[] = this.BuildGrouped(0, 1, filters);
    return result;
  }

  public static GetPivotHeades(groupedHeaders: IPivotHeaderGrouped[]): IPivotHeaderGrouped[][] {
    let result: IPivotHeaderGrouped[][] = [];

    groupedHeaders.forEach((g) => {
      result = result.concat(g.Ungroup());
    });

    return result;
  }

  public static CreateEditorData(
    rowFilter: IPivotHeaderGrouped[],
    columnFilter: IPivotHeaderGrouped[],
    cellDescriptions: ICellDescription[],
    cells: ICell[],
  ): ICellModel[][] {
    const pivotRowHeaders = this.GetPivotHeades(rowFilter);
    const pivotColumnHeaders = this.GetPivotHeades(columnFilter);

    let cellsTmp = cells.map((c) => new CellWrap(c));
    const cellDescriptionDictionary: { [id: string]: ICellDescription} = {};

    cellDescriptions.forEach((elm: ICellDescription): void => {
      const key = `${elm.rowIndex}_${elm.columnIndex}`;
      cellDescriptionDictionary[key] = elm;
    });

    function cellCtor(rIndex: number, cIndex: number): ICellModel {
      const rFilterValues = pivotRowHeaders[rIndex].map((x) => x.filterValueId);
      const cFilterValues = pivotColumnHeaders[cIndex].map((x) => x.filterValueId);

      const idx = cellsTmp.findIndex((item: CellWrap): boolean => {
        if (rFilterValues.some((filterVal) => !item.ContainsFilterValue(filterVal))) {
          return false;
        }

        if (cFilterValues.some((filterVal) => !item.ContainsFilterValue(filterVal))) {
          return false;
        }

        return true;
      });

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

    const rowCount = pivotRowHeaders.length;
    const columnCount = pivotColumnHeaders.length;
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
