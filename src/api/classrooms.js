import server from "./config";

export async function getUserClass(userId) {
  try {
    const res = await server.get(`/v1/user/${userId}/class`);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function getUserEnrolledClassroom(userId) {
  try {
    const res = await server.get(`/v1/user/${userId}`);
    return [res.data.enrolledIn, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function createNewClassroom(data, userId) {
  try {
    if (!("name" in data)) throw new Error("Name Field In Not In Data");
    const res = await server.post(`/v1/user/${userId}/class`, data);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}
