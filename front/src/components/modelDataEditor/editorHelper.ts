// eslint-disable-next-line max-classes-per-file
import { IFilterDescription, IFilterValue } from '../../store/filter';
import { ICellDescription } from '../../store/model';
import { ICell, ICellFilterValue } from '../../store/cell/types';
import ICellModel from '../excel/cellModel';
import CellWrap from './cellWrap';
import uuidv4 from '../../common/uuid';
import { IPivotHeaderGrouped, PivotHeaderGrouped } from '../excel/PivotHeaderGroup';

export default class EditorHelper {
  private static CreateCell(
    rowIndex: number,
    columnIndex: number,
    attached: ICell,
  ): ICellModel<ICell> {
    return {
      id: attached.id,
      value: attached.value,
      formula: attached.formula,
      rowIndex,
      columnIndex,
      attached,
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
      result = result.concat(g.ToGrid());
    });

    return result;
  }

  static PivotHeaderGroupedToCellFilterValue(arr: IPivotHeaderGrouped[]): ICellFilterValue[] {
    return arr.map((x): ICellFilterValue => ({ filterSystemName: x.filterSystemName, filterValueId: x.filterValueId }));
  }

  public static CreateEditorData(
    rowFilter: IPivotHeaderGrouped[],
    columnFilter: IPivotHeaderGrouped[],
    selectedFilters: ICellFilterValue[],
    cellDescriptions: ICellDescription[],
    cells: ICell[],
  ): ICellModel<ICell>[][] {
    const pivotRowHeaders = this.GetPivotHeades(rowFilter);
    const pivotColumnHeaders = this.GetPivotHeades(columnFilter);

    let cellsTmp = cells.map((c) => new CellWrap(c));
    const cellDescriptionDictionary: { [id: string]: ICellDescription} = {};

    cellDescriptions.forEach((elm: ICellDescription): void => {
      const key = `${elm.rowIndex}_${elm.columnIndex}`;
      cellDescriptionDictionary[key] = elm;
    });

    function cellCtor(rIndex: number, cIndex: number): ICellModel<ICell> {
      let rowAndColumnsFilters = EditorHelper.PivotHeaderGroupedToCellFilterValue(pivotRowHeaders[rIndex]);
      rowAndColumnsFilters = rowAndColumnsFilters.concat(EditorHelper.PivotHeaderGroupedToCellFilterValue(pivotColumnHeaders[cIndex]));

      const idx = cellsTmp.findIndex((item: CellWrap): boolean => {
        if (rowAndColumnsFilters.some((fv) => !item.ContainsFilterValue(fv.filterValueId))) {
          return false;
        }

        return true;
      });

      if (idx !== -1) {
        const result = cellsTmp[idx].cell;
        cellsTmp = cellsTmp.slice(idx, 1);
        return EditorHelper.CreateCell(rIndex, cIndex, result);
      }

      const cellDescr = cellDescriptionDictionary[`${rIndex}_${cIndex}`];
      const filterValues = rowAndColumnsFilters.concat(selectedFilters);
      if (cellDescr) {
        return EditorHelper.CreateCell(rIndex, cIndex,
          {
            id: uuidv4(),
            value: cellDescr.value,
            formula: cellDescr.formula,
            filterValues,
          });
      }

      // create empty
      return EditorHelper.CreateCell(rIndex, cIndex, {
        id: uuidv4(),
        value: null,
        formula: null,
        filterValues,
      });
    }

    const rowCount = pivotRowHeaders.length;
    const columnCount = pivotColumnHeaders.length;
    const rows: Array<ICellModel<ICell>[]> = new Array(rowCount);

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
