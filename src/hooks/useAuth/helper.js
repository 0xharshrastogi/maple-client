import server from "../../api/server";
import error from "../../error";
import { parseUser } from "../../utils";

export function extractUserId(GoogleAuth) {
  const currentUser = GoogleAuth.currentUser.get();
  const userId = currentUser.getBasicProfile().getId();

  return userId;
}

async function postNewUserRecord(currentUser) {
  const data = parseUser(currentUser.getBasicProfile());

  try {
    const userData = await server.User.postUser({ data });
    return userData;
  } catch (err) {
    return err;
  }
}

export async function fetchUserData(GoogleAuth) {
  const userID = extractUserId(GoogleAuth);

  try {
    const data = await server.User.getUser({ userID });
    return data;
  } catch (err) {
    if (err.code === error.NOT_FOUND)
      return postNewUserRecord(GoogleAuth.currentUser.get());

    return err;
  }
}
