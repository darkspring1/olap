import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import { sales } from './data.js';

const dataSource = new PivotGridDataSource({
    fields: [{
      caption: 'Region',
      width: 120,
      dataField: 'region',
      area: 'row'
    }, {
      caption: 'City',
      dataField: 'city',
      width: 150,
      area: 'row',
      selector: function(data) {
        return `${data.city } (${ data.country })`;
      }
    }, {
      dataField: 'date',
      dataType: 'date',
      area: 'column'
    }, {
      caption: 'Sales',
      dataField: 'amount',
      dataType: 'number',
      summaryType: 'sum',
      format: 'currency',
      area: 'data'
    }],
    store: sales
  });


  export default dataSource