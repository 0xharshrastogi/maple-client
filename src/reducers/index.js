import { combineReducers } from "redux";
import authentication from "./authentication";
import applicants from "./user";

const reducers = combineReducers({
  isSignedIn: authentication.reducer,
  user: applicants.reducer,
});

export const auth = authentication.type;
export const user = applicants.type;

export default reducers;
