
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

import * as React from 'react';


export interface GridProps {
  width: number;
  height: number;
  data: any[][];
  contextMenu: boolean;
  formulas: boolean;
}

export default class Grid extends React.Component<GridProps, {}> {
  data: any[][]

  render() {
    const {
      data, width, height, contextMenu, formulas,
    } = this.props;
    return (
      <>
        <HotTable
          data={data}
          contextMenu={contextMenu}
          formulas={formulas}
          colHeaders
          rowHeaders
          width={width}
          height={height}
          licenseKey="non-commercial-and-evaluation"
        />
      </>
    );
  }
}
