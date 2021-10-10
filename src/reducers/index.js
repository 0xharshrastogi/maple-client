import { combineReducers } from 'redux';
import authenticateReducer from './authentication';
import userReducer from './user';

const reducers = combineReducers({
  isSignedIn: authenticateReducer,
  user: userReducer,
});

export default reducers;
