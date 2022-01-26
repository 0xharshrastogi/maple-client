import server from "../api/server";
import { userClassrooms } from "../reducers";

export const fetchExistingClassroom = ({ userID }) => {
  return async (dispatch) => {
    try {
      const userData = await server.User.createdClassrooms({ userID });
      dispatch({ type: userClassrooms.userClassLoaded, payload: userData });
    } catch (err) {
      dispatch({ type: userClassrooms.error, payload: err });
    }
  };
};

export const createClassroom = ({ userID, data }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userClassrooms.startLoading });
      const result = await server.Classroom.create({ userID, data });
      dispatch({ type: userClassrooms.pushClassroom, payload: result });
    } catch (error) {
      dispatch({ type: userClassrooms.error, payload: error });
    }
  };
};
