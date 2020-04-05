/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createRootReducer } from './store';
import rootSaga from './sagas';


export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  // затем запускаем saga
  sagaMiddleware.run(rootSaga);

  return store;
}
