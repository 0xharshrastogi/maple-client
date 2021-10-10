import { combineReducers } from 'redux';
import authenticateReducer from './user';

const reducers = combineReducers({
  isSignedIn: authenticateReducer,
});

export default reducers;
