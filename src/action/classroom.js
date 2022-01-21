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
