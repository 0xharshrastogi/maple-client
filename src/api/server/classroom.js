import client from "./config";

const path = "/v1/user";

export async function fetchUserClassrooms({ userID }) {
  if (typeof userID !== "number" && typeof userID !== "string")
    throw new TypeError("UserID should be STRING | NUMBER");

  const { classrooms } = await client.get(`${path}/${userID}/classroom`);
  return classrooms;
}

export async function fetchUserEnrolledClassrooms({ userID }) {
  const classrooms = await client.get(`${path}/${userID}/enroll`);
  return classrooms;
}

export async function createClassroom({ userID, data }) {
  // eslint-disable-next-line no-prototype-builtins
  if (typeof data === "object" && !data.hasOwnProperty("name"))
    throw new TypeError("'Name' Field In  Not In Data");

  const result = await client.put(`${path}/${userID}/classroom`, data);
  console.log(result);
  return result;
}

export async function enrollToClassroom({ userID, classID }) {
  // PUT {{baseUri}}/v1/user/{{userID}}/classroom/{{classID}}/enroll HTTP/1.1
  const response = await client.put(`${path}/${userID}/classroom/${classID}/enroll`);
  return response;
}

export async function fetchClassroomData({ classID }) {
  return await client.get(`v1/classroom/${classID}`);
}
