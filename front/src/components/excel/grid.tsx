/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import './grid.css';
import CellViewModel from './cellViewModel';
import Cell from './cell';
import ICellModel from './cellModel';

interface IGridOwnProps {
  rowHeaders: string[];
  columnHeaders: string[];
  data: ICellModel[][];
}


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IGridDispatchProps {
}

type IGridProps = IGridOwnProps & IGridDispatchProps;

const Alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Grid extends React.Component<IGridProps, { }> {
  _alphaHeaders: string[];

  constructor(props: IGridProps) {
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
    const { rowHeaders, columnHeaders, data } = this.props;
    const gridRow = function (cells: CellViewModel[]) {
      return (cells.map((cell: CellViewModel) => <Cell key={cell.cell.columnIndex} cellViewModel={cell} />)
      );
    };

    const grid: CellViewModel[][] = new Array<Array<CellViewModel>>();

    data.forEach((row: ICellModel[], rIdx: number) => {
      grid[rIdx] = new Array<CellViewModel>(row.length);
      row.forEach((cell: ICellModel, cIdx: number) => {
        grid[rIdx][cIdx] = new CellViewModel(cell, grid);
      });
    });

    return (
      <table className="excel-grid">
        <thead>
          <tr>
            <th className="header" />
            <th className="header" />
            {columnHeaders.map((header: string, hIdx: number) => <th className="header" key={hIdx}>{header}</th>)}
          </tr>
          <tr>
            <th className="header" />
            <th className="header" />
            {this._alphaHeaders.map((header: string) => <th className="header" key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          { grid.map((row: CellViewModel[], rIdx: number) => (
            <tr key={row[0].cell.rowIndex}>
              <td className="header">{ rowHeaders[rIdx] }</td>
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
