import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => createStore(
  (state = {}) => state, applyMiddleware(thunk)
);
