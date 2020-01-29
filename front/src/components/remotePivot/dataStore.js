import { createStore } from 'devextreme-aspnet-data-nojquery';

const DataSource = {
  //remoteOperations: true,
  remoteOperations: false,
  store: createStore({
    key: 'OrderID',
    loadUrl: 'http://localhost:5000/pivot'
    //loadUrl: 'http://localhost:5000/pivot_lot_of_data'
  }),
  fields: [{
    caption: 'Country',
    width: 120,
    dataField: 'country',
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
    dataField: 'units_sold',
    dataType: 'number',
    summaryType: 'sum',
    //format: 'currency',
    area: 'data'
  }, {
    caption: 'Some fact',
    dataField: 'some_fact',
    dataType: 'number',
    summaryType: 'sum',
    //format: 'currency',
    area: 'data'
  }],
};


export default DataSource;
