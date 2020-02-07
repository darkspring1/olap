/* eslint-disable semi */

export default interface IColumnDescription {
  readonly caption: string;
  readonly systemName: string;
  readonly type: string;
}

export class ColumnDescription implements IColumnDescription {
  constructor(caption: string, systemName: string, type: string) {
    this.caption = caption;
    this.systemName = systemName;
    this.type = type;
  }

      readonly caption: string;

      readonly systemName: string;

      readonly type: string;
}
