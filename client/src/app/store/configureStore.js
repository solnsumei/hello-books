import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

/**
 * [configureStore description]
 * @method configureStore
 * @param  {[type]}       initialState [description]
 * @return {[type]}                    [description]
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
