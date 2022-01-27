import {
  fetchClassdata,
  fetchUserClassroom,
  fetchUserEnrolledClassrooms,
} from "./classroom";
import { enrollTo, fetchEnrolledClassrooms } from "./enrolledClassrooms";
import { removeUser, setUser } from "./user";
import { createClassroom, fetchExistingClassroom } from "./userClassroom.action";

const UserClassrooms = {
  created: { list: fetchExistingClassroom },
  enrolled: { list: fetchEnrolledClassrooms },
  create: createClassroom,
  join: enrollTo,
};

export {
  setUser,
  removeUser,
  fetchUserClassroom,
  fetchUserEnrolledClassrooms,
  fetchClassdata,
  UserClassrooms,
};
