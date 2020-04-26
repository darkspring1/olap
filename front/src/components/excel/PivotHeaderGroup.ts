
export interface IPivotHeaderGrouped {
  readonly filterSystemName: string;
  readonly filterValueId: string;
  readonly filterValue: string;
  readonly childs: IPivotHeaderGrouped[];
  readonly childCount: number;
  Ungroup(): IPivotHeaderGrouped[][];
}


export class PivotHeaderGrouped implements IPivotHeaderGrouped {
  private _filterSystemName: string;

  private _filterValueId: string;

  private _filterValue: string;

  private _childs: IPivotHeaderGrouped[];

  constructor(
    filterSystemName: string,
    filterValueId: string,
    filterValue: string,
    childs: IPivotHeaderGrouped[],
  ) {
    this._filterSystemName = filterSystemName;
    this._filterValueId = filterValueId;
    this._filterValue = filterValue;
    this._childs = childs;
  }

  public get filterSystemName(): string {
    return this._filterSystemName;
  }

  public get filterValueId(): string {
    return this._filterValueId;
  }

  public get filterValue(): string {
    return this._filterValue;
  }

  public get childs(): IPivotHeaderGrouped[] {
    return this._childs;
  }

  public get childCount(): number {
    return this._childs.length;
  }

  public Ungroup(): IPivotHeaderGrouped[][] {
    let result: IPivotHeaderGrouped[][] = [];

    if (this._childs.length === 0) {
      result[0] = [this];
      return result;
    }

    this._childs.forEach((cg) => {
      const cItems = cg.Ungroup();
      result = result.concat(cItems);
    });

    result.forEach((row) => row.unshift(this));

    return result;
  }
}
