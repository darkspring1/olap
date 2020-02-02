import ColumnDescription from './columnDescription.ts';
import RowDescription from './rowDescription.ts';

export default class ModelDescription {
  constructor(modelName: string, rows: Array<RowDescription>, columns: Array<ColumnDescription>) {
    this.ModelName = modelName;
    this.Rows = rows;
    this.Columns = columns;
  }

    readonly ModelName: string;

    readonly Rows: Array<RowDescription>;

    readonly Columns: Array<ColumnDescription>;
}
