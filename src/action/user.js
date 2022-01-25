import server from "../api/server";
import error from "../error";
import { auth, user } from "../reducers";
import { parseUser } from "../utils";

function extractUserId(GoogleAuth) {
  const currentUser = GoogleAuth.currentUser.get();
  const userId = currentUser.getBasicProfile().getId();

  return userId;
}

const signin = (data) => (dispatch) => {
  dispatch({ type: user.ADD_USER, payload: data });
  dispatch({ type: auth.signIn });
};

function handleNewUserRecord(currentUser) {
  return async (dispatch) => {
    const data = parseUser(currentUser.getBasicProfile());

    try {
      const userData = await server.User.postUser({ data });
      dispatch(signin(userData));
    } catch (err) {
      dispatch({ type: user.ERROR_USER, payload: err });
    }
  };
}

export function setUser(GoogleAuth) {
  if (!GoogleAuth) throw new Error("Google Auth Instance Not Passed");

  return async (dispatch) => {
    const userID = extractUserId(GoogleAuth);

    try {
      const data = await server.User.getUser({ userID });
      dispatch(signin(data));
    } catch (err) {
      if (err.code === error.NOT_FOUND)
        return dispatch(handleNewUserRecord(GoogleAuth.currentUser.get()));

      dispatch({ type: user.ERROR_USER, payload: err });
    }
  };
}

export function removeUser() {
  return (dispatch) => {
    dispatch({ type: auth.signOut });
    dispatch({ type: user.REMOVE_USER });
  };
}
