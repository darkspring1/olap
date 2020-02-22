/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-autofocus */
import * as React from 'react';
import ReactSpreadsheet from 'react-spreadsheet';
import CellView from './cellView.tsx';
import CellEdit from './cellEdit.tsx';
import CellViewModel from './cellViewModel.ts';

interface ISpreadsheetOwnProps {
    data: any[][];
}

interface ISpreadsheetDispatchProps {
    test(): void;
}

type ISpreadsheetProps = ISpreadsheetOwnProps & ISpreadsheetDispatchProps;


class Spreadsheet extends React.Component<ISpreadsheetProps, {}> {
  modelName: string

  // eslint-disable-next-line no-useless-constructor
  constructor(props: ISpreadsheetProps) {
    super(props);

    const { data } = this.props;

    const grid: CellViewModel[][] = new Array<Array<CellViewModel>>();

    data.forEach((row: any[], rIdx: number) => {
      grid[rIdx] = new Array<CellViewModel>(row.length);
      row.forEach((cell: any, cIdx: number) => {
        grid[rIdx][cIdx] = new CellViewModel(cell.id, cell.value, grid, CellView, CellEdit);
      });
    });

    this.state = { grid };
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <ReactSpreadsheet data={grid} />
      </>
    );
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Spreadsheet };
