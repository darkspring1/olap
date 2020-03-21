import uuid from 'common/uuid';
import { IFilterValue, IFilterDescription } from '../filter';
import { IModelDescription, IView } from '.';


export default class ModelDescriptionConverter {
  private static CreateModelColumn(cell: ICell, order: number): IFilterValue {
    const result: IFilterValue = { id: uuid(), name: cell.value, order };
    return result;
  }

  private static CreateModelRow(row: ICell[], order: number): IFilterValue {
    const result: IFilterValue = { id: uuid(), name: row[0].value, order };
    return result;
  }

  private static RowFilter(row: Array<ICell>, index: number): boolean {
    if (index === 0) {
      return false;
    }
    if (!row[0].value) {
      return false;
    }
    return true;
  }

  private static CreateCell(value: string, formula: string): ICell {
    return { id: uuid(), value, formula };
  }


  static FromData(modelName: string, data: ICell[][]): IModelDescription {
    const rows = data.filter(ModelDescriptionConverter.RowFilter).map(ModelDescriptionConverter.CreateModelRow);
    const columns = data[0].filter((c) => !!c.value).map(ModelDescriptionConverter.CreateModelColumn);

    const rowFilterName = `${modelName}_f1`;
    const colFilterName = `${modelName}_f2`;

    const cells: ICell[] = [];

    for (let i = 1; i < data.length;) {
      const row = data[i];
      for (let j = 1; j < row.length;) {
        if (row[j].value) {
          row[j].filterValues = [rows[i - 1].id, columns[j - 1].id];
          cells.push(row[j]);
        }
        j += 1;
      }
      i += 1;
    }

    const filters: IFilterDescription[] = [{ name: rowFilterName, values: rows }, { name: colFilterName, values: columns }];

    const views: IView[] = [{
      id: uuid(),
      name: 'default',
      rowFilters: [rowFilterName],
      columnFilters: [colFilterName],
      cellsDescription: null,
    }];

    const result: IModelDescription = {
      id: uuid(),
      name: modelName,
      views,
      filters,
    };
    return result;
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

  static CreateEmptyData(rowFilter: IFilterDescription, columnFilter: IFilterDescription): ICell[][] {
    const rowCount = rowFilter.values.length + 1;
    const columnCount = columnFilter.values.length + 1;
    const rows: Array<any[]> = new Array(rowCount);

    const r0 = new Array(columnCount);
    r0[0] = ModelDescriptionConverter.CreateCell(null, null);
    for (let k = 1; k < columnCount;) {
      r0[k] = ModelDescriptionConverter.CreateCell(columnFilter.values[k - 1].name, null);
      k += 1;
    }
    rows[0] = r0;

    for (let i = 1; i < rowCount;) {
      const r = new Array(columnCount);
      r[0] = ModelDescriptionConverter.CreateCell(rowFilter.values[i - 1].name, null);
      for (let j = 1; j < columnCount;) {
        r[j] = ModelDescriptionConverter.CreateCell(null, null);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }
}
