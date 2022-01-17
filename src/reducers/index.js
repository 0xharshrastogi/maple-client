import { combineReducers } from "redux";
import authentication from "./authenticationv2";
import userReducer from "./user";

const reducers = combineReducers({
  isSignedIn: authentication.reducer,
  user: userReducer,
});

export const auth = authentication.type;

export default reducers;
