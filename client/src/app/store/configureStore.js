import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

/* eslint-disable */
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

/**
 * [configureStore description]
 * @method configureStore
 * @return {[type]}                    [description]
 */
export default function configureStore() {
  return createStore(rootReducer, enhancer);
}
