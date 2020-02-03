import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import UpdateModelDescriptionSaga from 'sagas';
import createRootReducer from './reducers/index.ts';

export const history = createBrowserHistory();

export default function configureStore(preloadedState: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware,
      ),
    ),
  );

  // затем запускаем saga
  sagaMiddleware.run(UpdateModelDescriptionSaga);

  return store;
}
