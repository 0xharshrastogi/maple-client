import {
  fetchClassdata,
  fetchUserClassroom,
  fetchUserEnrolledClassrooms,
} from "./classroom";
import { removeUser, setUser } from "./user";
import { createClassroom, fetchExistingClassroom } from "./userClassroom.action";

const UserClassrooms = {
  created: {
    list: fetchExistingClassroom,
  },
  create: createClassroom,
};

export {
  setUser,
  removeUser,
  fetchUserClassroom,
  fetchUserEnrolledClassrooms,
  fetchClassdata,
  UserClassrooms,
};
