export default class ColumnDescription {
  constructor(caption: string, systemName: string, type: string) {
    this.Caption = caption;
    this.SystemName = systemName;
    this.Type = type;
  }

      readonly Caption: string;

      readonly SystemName: string;

      readonly Type: string;
}
