/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import './grid.css';
import CellViewModel from './cellViewModel';
import Cell from './cell';
import ICellModel from './cellModel';
import { IPivotHeaderGrouped } from './PivotHeaderGroup';

interface IGridOwnProps<TAttached> {
  rowPivotGroupedHeaders: IPivotHeaderGrouped[];
  columnPivotGroupedHeaders: IPivotHeaderGrouped[];
  data: ICellModel<TAttached>[][];
  debug: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IGridDispatchProps {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IGridProps<TAttached> extends IGridOwnProps<TAttached>, IGridDispatchProps {

}

const Alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Grid<TAttached> extends React.Component<IGridProps<TAttached>, { }> {
  _alphaHeaders: string[];

  constructor(props: IGridProps<TAttached>) {
    super(props);

    const { data } = this.props;

    this._alphaHeaders = new Array(data[0].length);

    for (let i = 0; i < this._alphaHeaders.length;) {
      if (i < Alpha.length) {
        this._alphaHeaders[i] = Alpha[i];
      } else {
        const quotient = Math.floor(i / Alpha.length);
        const remainder = i % Alpha.length;
        this._alphaHeaders[i] = `${Alpha[quotient - 1]}${Alpha[remainder]}`;
      }

      i += 1;
    }
  }

  render() {
    type CellViewModelType = CellViewModel<TAttached>;
    const {
      rowPivotGroupedHeaders, columnPivotGroupedHeaders, data, debug,
    } = this.props;

    let colHeaderSubs: IPivotHeaderGrouped[] = [];

    columnPivotGroupedHeaders.forEach((g) => {
      const c = g.ToGrid();
      colHeaderSubs = colHeaderSubs.concat(c[0]);
    });

    let rowHeaders: IPivotHeaderGrouped[][] = [];

    rowPivotGroupedHeaders.forEach((g) => {
      const ungrouped = g.ToGrid();
      rowHeaders = rowHeaders.concat(ungrouped);
    });

    const gridRow = function (cells: CellViewModelType[]) {
      return (cells.map((cell: CellViewModelType) => <Cell debug={debug} key={cell.cell.columnIndex} cellViewModel={cell} />)
      );
    };

    const grid: CellViewModelType[][] = new Array<Array<CellViewModelType>>();

    data.forEach((row: ICellModel<TAttached>[], rIdx: number) => {
      grid[rIdx] = new Array<CellViewModelType>(row.length);
      row.forEach((cell: ICellModel<TAttached>, cIdx: number) => {
        grid[rIdx][cIdx] = new CellViewModel<TAttached>(cell, grid);
      });
    });

    function renderRowHeaderValue(h: IPivotHeaderGrouped): any {
      if (debug) {
        return (
          <>
            <div>
              filterSystemName
            </div>
            <div>
              { h.filterSystemName }
            </div>

            <div>
              filterValueId
            </div>
            <div>
              { h.filterValueId }
            </div>
            <div>{ h.filterValue }</div>
          </>
        );
      }

      return (<>{h.filterValue}</>);
    }

    function renderRowHeaders(idx: number): any {
      return rowHeaders[idx].map((h) => {
        if (h.childCount === 0) {
          return (<td className="header" key={h.filterValueId}>{ renderRowHeaderValue(h) }</td>);
        }

        if (idx % h.childCount !== 0) {
          return null;
        }

        return (<td className="header" key={h.filterValueId} rowSpan={h.childCount}>{ renderRowHeaderValue(h) }</td>);
      });
    }

    return (
      <table className="excel-grid">
        <thead>
          <tr>
            <th className="header" />
            { rowHeaders[0].map((r) => (<th key={r.filterValueId} className="header" />)) }
            { colHeaderSubs.map((header, hIdx) => <th className="header" key={hIdx}>{header.filterValue}</th>)}
          </tr>
          <tr>
            <th className="header" />
            { rowHeaders[0].map((r) => (<th key={r.filterValueId} className="header" />)) }
            {this._alphaHeaders.map((header: string) => <th className="header" key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          { grid.map((row: CellViewModelType[], rIdx: number) => (
            <tr key={row[0].cell.rowIndex}>
              { renderRowHeaders(rIdx) }
              <td className="header">{rIdx + 1}</td>
              {gridRow(row)}
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Grid };
