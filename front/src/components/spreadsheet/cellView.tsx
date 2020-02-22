/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
import * as React from 'react';
import CellViewModel from './cellViewModel.ts';


interface IGetValueParams {
    data: CellViewModel;
  }

  interface ICellViewProps {
    cell: CellViewModel;
    getValue(arg: IGetValueParams): any;
  }

const regex = /[a-zA-z]{1,2}[1-9]{1}[0-9]*/gm;

export default class CellView extends React.Component<ICellViewProps, {}> {
  static formulaParse(str: string) {
    let m;
    const formula = str.trim();
    debugger;
    // eslint-disable-next-line no-cond-assign
    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex += 1;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
      });
    }
  }

  static OffEditMode(cell: CellViewModel): void {
    cell.isEditable = false;
    if (cell.value[0] === '=') {
      this.formulaParse(cell.value);
    }
  }

  render() {
    const { cell, getValue } = this.props;
    if (cell.isEditable) {
      CellView.OffEditMode(cell);
    }
    const v = getValue({ data: cell }) || '';
    return v;
  }
}
