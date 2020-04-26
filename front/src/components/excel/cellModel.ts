export default interface ICellModel<TAttached> {
  readonly id: string;

  value: string;

  formula: string;

  readonly rowIndex: number;

  readonly columnIndex: number;

  readonly attached: TAttached;
}