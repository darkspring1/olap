import ColumnDescription from './columnDescription.ts';
import RowDescription from './rowDescription.ts';
import ModelDescription from './modelDescription.ts';

class ModelDescriptionConverter {
  // eslint-disable-next-line class-methods-use-this
  private CreateModelColumn(header: string, index: number): ColumnDescription {
    return new ColumnDescription(header, `c_${index}`, 'number');
  }

  // eslint-disable-next-line class-methods-use-this
  private CreateModelRow(row: any[]): RowDescription {
    return new RowDescription(row[0]);
  }

  FromData(modelName: string, data: any[][]): ModelDescription {
    const rows = data.map(this.CreateModelRow);
    const columns = data[0].map(this.CreateModelColumn);
    return new ModelDescription(modelName, rows, columns);
  }
}

const modelDescriptionConverter = new ModelDescriptionConverter();

export default modelDescriptionConverter;
