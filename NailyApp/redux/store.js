import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authenticationReducer from './reducers/authenticationReducer';
import profileReducer from './reducers/profileReducer';
import salonReducer from './reducers/salonReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
  authenticationReducer,
  profileReducer,
  salonReducer,
});

const composeEnhancer = composeWithDevTools({
  name: 'NailyApp',
});

const enhancers = composeEnhancer(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancers);

export default store;
