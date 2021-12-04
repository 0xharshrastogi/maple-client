import server from "./config";

export async function postUser(data) {
  try {
    const res = await server.post("/v1/user", data);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function getUser(userId) {
  try {
    const response = await server.get(`/v1/user/${userId}`);
    return [response.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function updateUser(userId, data) {
  const res = await server.patch(`/user/${userId}`, data);
  if (res.status === 200) return true;
  return false;
}
