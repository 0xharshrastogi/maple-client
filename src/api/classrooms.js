import server from "./config";

export async function getUserClass(userId) {
  try {
    const res = await server.get(`/v1/user/${userId}/classroom`);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function getUserEnrolledClassroom(userId) {
  try {
    const res = await server.get(`/v1/user/${userId}`);
    return [res.data.classrooms, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function createNewClassroom(data, userId) {
  try {
    if (!("name" in data)) throw new Error("Name Field In Not In Data");
    const res = await server.post(`/v1/user/${userId}/classroom`, data);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}

export async function joinClassRoom(userId, classId) {
  try {
    const response = await server.patch(`/v1/user/${userId}/enroll/${classId}`);
    return [response, undefined];
  } catch (err) {
    return [undefined, err.response ? err.response.data : err];
  }
}

export async function getClassroomData(classId) {
  try {
    const res = await server.get(`v1/class/${classId}`);
    return [res.data, undefined];
  } catch (err) {
    return [undefined, err.response.data];
  }
}
