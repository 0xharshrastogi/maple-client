import server from "../../api/server";
import { parseUser } from "../../utils";

export function extractUserId(GoogleAuth) {
  const currentUser = GoogleAuth.currentUser.get();
  const userId = currentUser.getBasicProfile().getId();

  return userId;
}

async function postNewUserRecord(currentUser) {
  const data = parseUser(currentUser.getBasicProfile());
  try {
    const userData = await server.User.postUser({
      ...data,
      userID: data.userId,
      givenname: data.givenName,
    });
    return userData;
  } catch (err) {
    return err;
  }
}

export async function fetchUserData(GoogleAuth) {
  const userID = extractUserId(GoogleAuth);

  try {
    // TODO: Getiing Unknow Response From Server To BE FIxed
    const data = await server.User.getUser({ userID });
    console.log(data);
    return data.user;
  } catch (err) {
    if (err.status === "Not Found") return await postNewUserRecord(GoogleAuth.currentUser.get());
    return err;
  }
}
