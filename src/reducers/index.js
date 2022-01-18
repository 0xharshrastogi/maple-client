import { combineReducers } from "redux";
import authentication from "./authenticationv2";
import applicants from "./userv2";

const reducers = combineReducers({
  // isSignedIn: authenticateReducer,
  // user: userReducer,
  isSignedIn: authentication.reducer,
  user: applicants.reducer,
});

export const auth = authentication.type;
export const user = applicants.type;

export default reducers;
