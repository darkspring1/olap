import React, { Component } from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import UpdateModelDescriptionSaga from './sagas'
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import App from './app'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
const history = syncHistoryWithStore(createBrowserHistory(), store);
// затем запускаем saga
sagaMiddleware.run(UpdateModelDescriptionSaga)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      {/* <Router path="/about" component={About}/> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.querySelector("#root")
// )
