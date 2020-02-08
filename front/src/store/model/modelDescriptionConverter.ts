import IColumnDescription from './columnDescription.ts';
import IRowDescription from './rowDescription.ts';
import IModelDescription from './modelDescription.ts';

class ModelDescriptionConverter {
  // eslint-disable-next-line class-methods-use-this
  private CreateModelColumn(caption: string, index: number): IColumnDescription {
    const result: IColumnDescription = { caption, systemName: `c_${index}`, type: 'number' };
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  private CreateModelRow(row: any[]): IRowDescription {
    const result: IRowDescription = { caption: row[0] };
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  private RowFilter(row: any[], index: number): boolean {
    if (index === 0) {
      return false;
    }
    if (!row[0]) {
      return false;
    }
    return true;
  }

  FromData(modelName: string, data: any[][]): IModelDescription {
    const rows = data.filter(this.RowFilter).map(this.CreateModelRow);
    const columns = data[0].filter((c) => !!c).map(this.CreateModelColumn);
    const result: IModelDescription = { modelName, rows, columns };
    return result;
  }
}

const modelDescriptionConverter = new ModelDescriptionConverter();

export default modelDescriptionConverter;
