import { combineReducers } from 'redux';
import userReducer from './user';

const reducers = combineReducers({
  isSignedIn: userReducer,
});

export default reducers;
