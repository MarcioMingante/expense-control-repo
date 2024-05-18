import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore } from 'redux';
import { rootReducer } from './reducers';

const store = legacy_createStore(rootReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
