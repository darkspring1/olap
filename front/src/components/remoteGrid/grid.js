import React from 'react';

import 'devextreme/data/odata/store';
import { Column, DataGrid, FilterRow, HeaderFilter, GroupPanel, Scrolling, Editing, Grouping, Lookup, MasterDetail, Summary, RangeRule, RequiredRule, StringLengthRule, GroupItem, TotalItem, ValueFormat } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
//import MasterDetailGrid from 'MasterDetailGrid.js';

const url = 'http://localhost:5000/grid';

const dataSource = createStore({
  key: 'id',
  loadUrl: url,
  insertUrl: `${url}/InsertOrder`,
  updateUrl: `${url}/UpdateOrder`,
  deleteUrl: `${url}/DeleteOrder`,
//   onBeforeSend: (method, ajaxOptions) => {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   }
});



class Grid extends React.Component {
  render() {
    return (
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        height={600}
        remoteOperations={true}
      >
       
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true} />
        {/* <Scrolling mode="virtual" /> */}
        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />
        <Grouping autoExpandAll={false} />

        {/* <Column dataField="CustomerID" caption="Customer">
          <Lookup dataSource={customersData} valueExpr="Value" displayExpr="Text" />
          <StringLengthRule max={5} message="The field Customer must be a string with a maximum length of 5." />
        </Column> */}

        <Column dataField="date" dataType="date">
          <RequiredRule message="The OrderDate field is required." />
        </Column>

        <Column dataField="country">
        
        </Column>

        <Column dataField="city">
         
        </Column>

        <Column
          dataField="units_sold"
          caption="Units sold"
          dataType="number"
        >
      
        </Column>
      
      </DataGrid>
    );
  }
}

export default Grid;