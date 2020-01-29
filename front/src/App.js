import React from 'react';

import SimplePivot from "./components/simplePivot/simplePivot"
import RemotePivot from "./components/remotePivot/pivot"
import ArrayGrid from "./components/arrayGrid/grid"
import RemoteGrid from "./components/remoteGrid/grid"
import ExcelGrid from "./components/excelGrid/grid"
import Api from "./apiService"
import Hello from "./containers/hello"



class App extends React.Component {
  render() {
    return (
    <>
      <Hello></Hello>
      <ExcelGrid width="600" height="600"></ExcelGrid>
    </>
    );
  }
}


export default App;
