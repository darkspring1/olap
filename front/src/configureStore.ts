/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import UpdateModelDescriptionSaga from 'sagas';
import createRootReducer from 'reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  // затем запускаем saga
  sagaMiddleware.run(UpdateModelDescriptionSaga);

  return store;
}
