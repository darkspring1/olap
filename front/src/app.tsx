import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import BuilderContainer from './containers/builderContainer';
import history from './common/browserHistory';
import EditorContainer from './containers/editorContainer';

export default () => (
  <main>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={BuilderContainer} />
        <Route path="/model/:id/data" component={EditorContainer} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </Router>
  </main>
);
