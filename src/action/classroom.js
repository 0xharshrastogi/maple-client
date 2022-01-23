import server from "../api/server";

export function fetchUserClassroom({ userID, onError, onSuccess }) {
  if (
    !onError &&
    typeof onError !== "function" &&
    !onSuccess &&
    typeof onSuccess !== "function"
  )
    throw new Error("Expected 'onError' and 'onSuccess' to be callback");

  return async () => {
    try {
      const data = await server.User.createdClassrooms({ userID });
      onSuccess(data);
    } catch (err) {
      onError(err);
    }
  };
}

export function fetchUserEnrolledClassrooms({ userID, onError, onSuccess }) {
  if (
    !onError &&
    typeof onError !== "function" &&
    !onSuccess &&
    typeof onSuccess !== "function"
  )
    throw new Error("Expected 'onError' and 'onSuccess' to be callback");

  return async () => {
    try {
      const data = await server.User.enrolledClassrooms({ userID });
      onSuccess(data);
    } catch (err) {
      onError(err);
    }
  };
}

export function fetchClassdata({ classID, onError, onSuccess }) {
  return async () => {
    try {
      const data = await server.Classroom.fetchData({ classID });
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };
}
