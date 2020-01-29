import React from 'react';

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { CheckBox } from 'devextreme-react';
import { data } from './data.js';

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoExpandAll: true
    };

    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
  }

  render() {
    return (
      <div>
        <DataGrid
          dataSource={data}
          allowColumnReordering={true}
          showBorders={true}
        >
          <GroupPanel visible={true} />
          <SearchPanel visible={true} />
          <Grouping autoExpandAll={this.state.autoExpandAll} />
          <Paging defaultPageSize={10} />

          <Column dataField="date" dataType="date" />
          <Column dataField="country" dataType="string" />
          <Column dataField="city" dataType="string" />
          <Column dataField="units_sold" dataType="number" />
          {/* <Column dataField="City" dataType="string" />
          <Column dataField="State" dataType="string" groupIndex={0} /> */}
        </DataGrid>

        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox text="Expand All Groups"
              value={this.state.autoExpandAll}
              onValueChanged={this.onAutoExpandAllChanged} />
          </div>
        </div>
      </div>
    );
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll
    });
  }
}

export default Grid;
