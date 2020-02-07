import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.ts';
import App from './app.tsx';

const store = configureStore(/* provide initial state if any */);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
