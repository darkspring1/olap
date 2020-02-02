
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

import * as React from 'react'


export interface GridProps {
  width: number
  height: number
  data: any[][]
}

export default class Grid extends React.Component<GridProps, {}> {

  data: any[][]
  constructor(props: GridProps) {
    super(props);
    
    
  }

  render() {
    return (
      <>
        <HotTable data={this.props.data} colHeaders={true} rowHeaders={true} width={this.props.width} height={this.props.height} />
      </>
    );
  }
}