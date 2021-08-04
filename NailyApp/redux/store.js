import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authenticationReducer from './reducers/credentialsSaved';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({authenticationReducer});

const composeEnhancer = composeWithDevTools({
  name: 'NailyApp',
});

const enhancers = composeEnhancer(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancers);

export default store;
