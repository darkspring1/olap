import React from 'react';
import { connect } from 'react-redux';
import BuilderContainer from './containers/builderContainer.ts';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <BuilderContainer />
    );
  }
}

function mapStateToProps(state: any, ownProps: any): any {
  return {};
}


function mapDispatchToProps(dispatch: any, ownProps: any): any {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
