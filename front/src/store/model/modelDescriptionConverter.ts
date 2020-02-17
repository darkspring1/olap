import uuid from 'common/uuid.ts';
import IColumnDescription from './columnDescription.ts';
import IRowDescription from './rowDescription.ts';
import IModelDescription from './modelDescription.ts';

export default class ModelDescriptionConverter {
  private static CreateModelColumn(caption: string, index: number): IColumnDescription {
    const result: IColumnDescription = { caption, systemName: `c_${index}`, type: 'number' };
    return result;
  }

  private static CreateModelRow(row: any[]): IRowDescription {
    const result: IRowDescription = { caption: row[0] };
    return result;
  }

  private static RowFilter(row: any[], index: number): boolean {
    if (index === 0) {
      return false;
    }
    if (!row[0]) {
      return false;
    }
    return true;
  }

  private static CreateCell(value: string): any {
    return { id: uuid(), value };
  }

  static FromData(modelName: string, data: any[][]): IModelDescription {
    const rows = data.filter(ModelDescriptionConverter.RowFilter).map(ModelDescriptionConverter.CreateModelRow);
    const columns = data[0].filter((c) => !!c).map(ModelDescriptionConverter.CreateModelColumn);
    const result: IModelDescription = { modelName, rows, columns };
    return result;
  }

  static ToData(modelDescription: IModelDescription): any[][] {
    const rowCount: number = modelDescription.rows.length;
    const columnCount: number = modelDescription.columns.length;
    const rows: any[] = new Array(rowCount + 1);

    const r0 = new Array(columnCount + 1);
    r0[0] = ModelDescriptionConverter.CreateCell(null);
    for (let k = 0; k < columnCount;) {
      r0[k + 1] = ModelDescriptionConverter.CreateCell(modelDescription.columns[k].caption);
      k += 1;
    }
    rows[0] = r0;

    for (let i = 0; i < rowCount;) {
      const r = new Array(columnCount + 1);
      r[0] = ModelDescriptionConverter.CreateCell(modelDescription.rows[i].caption);
      for (let j = 0; j < columnCount;) {
        r[j + 1] = ModelDescriptionConverter.CreateCell(null);
        j += 1;
      }
      rows[i + 1] = r;
      i += 1;
    }
    return rows;
  }

  static CreateEmptyData(rowCount: number, columnCount: number): any[][] {
    const rows: any[] = new Array(rowCount);
    for (let i = 0; i < rowCount;) {
      const r = new Array(columnCount);
      for (let j = 0; j < columnCount;) {
        r[j] = ModelDescriptionConverter.CreateCell(null);
        j += 1;
      }
      rows[i] = r;
      i += 1;
    }
    return rows;
  }
}
