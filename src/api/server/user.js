import client from "./config";

const path = "/v1/user/";

export function getUser({ userID }) {
  if (typeof userID !== "number" && typeof userID !== "string")
    throw new TypeError("UserID should be STRING | NUMBER");

  return client.get(path + userID.toString());
}

export function postUser({ data }) {
  return client.post(path, data);
}

export async function patchUser({ userID, data }) {
  if (typeof userID !== "number" && typeof userID !== "string")
    throw new TypeError("UserID should be STRING | NUMBER");

  return new Promise((_, reject) => {
    client.patch(path + userID.toString(), data).catch((reason) => {
      return reject(new Error({ message: "Failed To Patch User", reason }));
    });
  });
}
