/* eslint-disable no-param-reassign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-debugger */
import * as React from 'react';
import Cell from './cellViewModel.ts';


interface IGetValueParams {
    data: Cell;
  }

  interface ICellEditProps {
    cell: Cell;
    getValue(arg: IGetValueParams): any;
    onChange(cell: Cell): any;
  }

export default class CellEdit extends React.Component<ICellEditProps, {}> {
  static GetValue(cell: Cell): string {
    return cell.editValue;
  }

  render() {
    const { cell, getValue, onChange } = this.props;
    return (
      <div className="DataEditor">
        <input
          type="text"
          onChange={(e) => {
            cell.isEditable = true;
            const updatedCell: Cell = { ...cell, editValue: e.target.value };
            onChange(updatedCell);
          }}
          onFocusOut={(e) => {
            debugger;
            console.log('blur');
          }}
          value={CellEdit.GetValue(cell)}
        />
      </div>
    );
  }
}
