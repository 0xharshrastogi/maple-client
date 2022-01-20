import server from "../api/server";

function extractUserId(GoogleAuth) {
  const currentUser = GoogleAuth.currentUser.get();
  const userId = currentUser.getBasicProfile().getId();

  return userId;
}

export function setUser(GoogleAuth, onComplete) {
  if (!GoogleAuth) throw new Error("Google Auth Instance Not Passed");

  return async () => {
    const userID = extractUserId(GoogleAuth);
    userID;

    try {
      console.log(await server.User.getUser({ userID: 10 }));
    } catch (err) {
      onComplete(err);
    }
  };
}
