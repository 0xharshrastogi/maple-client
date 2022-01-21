import {
  createClassroom,
  enrollToClassroom,
  fetchClassroomData,
  fetchUserClassrooms,
  fetchUserEnrolledClassrooms,
} from "./classroom";
import { getUser, patchUser, postUser } from "./user";

const User = {
  getUser,
  postUser,
  patchUser,
  createdClassrooms: fetchUserClassrooms,
  enrolledClassrooms: fetchUserEnrolledClassrooms,
  enrollTo: enrollToClassroom,
};

const Classroom = {
  fetchData: fetchClassroomData,
  create: createClassroom,
};

export default { User, Classroom };
