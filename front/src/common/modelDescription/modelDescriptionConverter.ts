import { ColumnDescription } from './columnDescription.ts';
import { RowDescription } from './rowDescription.ts';
import ModelDescription from './modelDescription.ts';

class ModelDescriptionConverter {
  // eslint-disable-next-line class-methods-use-this
  private CreateModelColumn(caption: string, index: number): ColumnDescription {
    return new ColumnDescription(caption, `c_${index}`, 'number');
  }

  // eslint-disable-next-line class-methods-use-this
  private CreateModelRow(row: any[]): RowDescription {
    return new RowDescription(row[0]);
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

  FromData(modelName: string, data: any[][]): ModelDescription {
    const rows = data.filter(this.RowFilter).map(this.CreateModelRow);
    const columns = data[0].filter((c) => !!c).map(this.CreateModelColumn);
    return new ModelDescription(modelName, rows, columns);
  }
}

const modelDescriptionConverter = new ModelDescriptionConverter();

export default modelDescriptionConverter;
