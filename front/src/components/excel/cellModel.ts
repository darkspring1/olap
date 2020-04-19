export default interface ICellModel {
  readonly id: string;

  value: string;

  formula: string;

  readonly rowIndex: number;

  readonly columnIndex: number;
}