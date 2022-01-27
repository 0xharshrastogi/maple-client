import server from "../api/server";
import { enrolledClassrooms } from "../reducers";

export const fetchEnrolledClassrooms = ({ userID }) => {
  return async (dispatch) => {
    try {
      const data = await server.User.enrolledClassrooms({ userID });
      return dispatch({ type: enrolledClassrooms.classroomFetched, payload: data });
    } catch (error) {
      dispatch({ type: enrolledClassrooms.error, payload: error });
    }
  };
};

export const enrollTo = ({ classID, userID }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: enrolledClassrooms.startLoading });
      await server.User.enrollTo({ userID, classID });
      const classdata = await server.Classroom.fetchData({ classID });

      dispatch({ type: enrolledClassrooms.pushClassroom, payload: classdata });
    } catch (error) {
      console.log(error);
      dispatch({ type: enrolledClassrooms.error, payload: error });
    }
  };
};
