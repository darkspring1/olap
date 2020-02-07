import IColumnDescription, { ColumnDescription } from './columnDescription.ts';
import IRowDescription, { RowDescription } from './rowDescription.ts';

export interface IModelDescription {
    readonly modelName: string;

    readonly rows: Array<IRowDescription>;

    readonly columns: Array<IColumnDescription>;
}

export default class ModelDescription implements IModelDescription {
  constructor(modelName: string, rows: Array<RowDescription>, columns: Array<ColumnDescription>) {
    this.modelName = modelName;
    this.rows = rows;
    this.columns = columns;
  }

    readonly modelName: string;

    readonly rows: Array<RowDescription>;

    readonly columns: Array<ColumnDescription>;
}
