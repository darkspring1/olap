/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-debugger */
import * as React from 'react';
import './grid.css';
import CellViewModel from './cellViewModel.ts';
import Cell from './cell.tsx';
import ICell from '../../store/model/cell.ts';

interface IGridOwnProps {
  data: ICell[][];
}

interface IGridState {
  grid: CellViewModel[][];
}

interface IGridDispatchProps {
    test(): void;
}

type IGridProps = IGridOwnProps & IGridDispatchProps;

const Alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Grid extends React.Component<IGridProps, IGridState> {
  _columnHeaders: string[];

  // eslint-disable-next-line no-useless-constructor
  constructor(props: IGridProps) {
    super(props);

    const { data } = this.props;

    const grid: CellViewModel[][] = new Array<Array<CellViewModel>>();

    this._columnHeaders = new Array(data[0].length);

    for (let i = 0; i < this._columnHeaders.length;) {
      if (i < Alpha.length) {
        this._columnHeaders[i] = Alpha[i];
      } else {
        const quotient = Math.floor(i / Alpha.length);
        const remainder = i % Alpha.length;
        this._columnHeaders[i] = `${Alpha[quotient - 1]}${Alpha[remainder]}`;
      }

      i += 1;
    }

    data.forEach((row: ICell[], rIdx: number) => {
      grid[rIdx] = new Array<CellViewModel>(row.length);
      row.forEach((cell: ICell, cIdx: number) => {
        grid[rIdx][cIdx] = new CellViewModel(cell, grid);
      });
    });

    this.state = { grid };
  }

  render() {
    const { grid } = this.state;
    const gridRow = function (cells: CellViewModel[]) {
      return (cells.map((cell: CellViewModel) => <Cell key={cell.cell.id} cellViewModel={cell} />)
      );
    };

    return (
      <table className="excel-grid">
        <thead>
          <tr>
            <th />
            {this._columnHeaders.map((header: string, hIdx: number) => <th key={hIdx}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          { grid.map((row: CellViewModel[], rIdx: number) => (
            <tr key={rIdx}>
              <td>{rIdx + 1}</td>
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
