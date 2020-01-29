import React from 'react';

import { PivotGrid, Scrolling } from 'devextreme-react/pivot-grid';
import DataSource from "./dataStore"

class Pivot extends React.Component {
  render() {
    return (
      <>
      <div className="long-title">
          <h3>Units sold by Region</h3>
        </div>
      <PivotGrid
        allowSorting={true}
        allowSortingBySummary={true}
        allowFiltering={true}
        height={620}
        showBorders={true}
        rowHeaderLayout="tree"
        dataSource={DataSource}>

        <Scrolling mode="virtual" />
      </PivotGrid>
      </>
    );
  }
}

export default Pivot;
