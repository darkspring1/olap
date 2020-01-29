
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

import * as React from 'react'
export interface GridProps {
  width: number
  height: number
}

export default class Grid extends React.Component<GridProps, {}> {

  data: any[][]
  constructor(props: GridProps) {
    super(props);
    
    this.data = [
      ['Lada', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ];
  }

  render() {
    return (<HotTable data={this.data} colHeaders={true} rowHeaders={true} width={this.props.width} height={this.props.height} />);
  }
}