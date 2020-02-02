
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

import * as React from 'react';


export interface GridProps {
  width: number;
  height: number;
  data: any[][];
}

export default class Grid extends React.Component<GridProps, {}> {
  data: any[][]

  render() {
    const { data, width, height } = this.props;
    return (
      <>
        <HotTable
          data={data}
          colHeaders
          rowHeaders
          width={width}
          height={height}
        />
      </>
    );
  }
}
