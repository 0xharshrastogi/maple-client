import { combineReducers } from "redux";
import authentication from "./authentication";
import userEnrolledClassrooms from "./enrolledClassrooms";
import applicants from "./user";
import userCreatedClassrooms from "./userCreatedClassrooms";

const reducers = combineReducers({
  userCreatedClassrooms: userCreatedClassrooms.reducer,
  userEnrolledClassrooms: userEnrolledClassrooms.reducer,
});

export const auth = authentication.type;
export const user = applicants.type;
export const userClassrooms = userCreatedClassrooms.type;
export const enrolledClassrooms = userEnrolledClassrooms.type;

export default reducers;
