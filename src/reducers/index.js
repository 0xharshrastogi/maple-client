import { combineReducers } from "redux";
import authentication from "./authentication";
import applicants from "./user";
import userCreatedClassrooms from "./userCreatedClassrooms";

const reducers = combineReducers({
  userCreatedClassrooms: userCreatedClassrooms.reducer,
});

export const auth = authentication.type;
export const user = applicants.type;
export const userClassrooms = userCreatedClassrooms.type;

export default reducers;
