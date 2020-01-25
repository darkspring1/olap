import React from 'react';

import PivotGrid, {
  FieldChooser,
  Export
} from 'devextreme-react/pivot-grid';


import dataSource from "./arrayDataSource"

class SimplePivot extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="long-title">
          <h3>Sales Amount by Region</h3>
        </div>
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowSorting={true}
          allowFiltering={true}
          allowExpandAll={true}
          height={440}
          showBorders={true}
        >
          <Export enabled={true} fileName="Sales" />
          <FieldChooser enabled={false} />
        </PivotGrid>
      </React.Fragment>
    );
  }
}


export default SimplePivot;