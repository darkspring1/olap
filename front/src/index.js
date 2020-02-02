import React, { Component } from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import UpdateModelDescriptionSaga from './sagas'
import App from './app'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

// затем запускаем saga
sagaMiddleware.run(UpdateModelDescriptionSaga)

//store.runSaga(UpdateModelDescriptionSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
)
