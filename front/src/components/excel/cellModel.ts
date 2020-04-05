export default interface ICellModel {

  value: string;

  formula: string;

  readonly rowIndex: number;

  readonly columnIndex: number;
}