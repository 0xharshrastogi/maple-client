import client from "./config";
import { getUser } from "./user";

const path = "/v1/user/";

export async function fetchUserClassrooms({ userID }) {
  if (typeof userID !== "number" && typeof userID !== "string")
    throw new TypeError("UserID should be STRING | NUMBER");

  const { result } = await client.get(path + userID.toString() + "/class");
  return result;
}

export async function fetchUserEnrolledClassrooms({ userID }) {
  const { enrolledIn } = await getUser({ userID });
  return enrolledIn.results;
}

export async function createClassroom({ userID, data }) {
  // eslint-disable-next-line no-prototype-builtins
  if (typeof data === "object" && !data.hasOwnProperty("name"))
    throw new TypeError("'Name' Field In  Not In Data");

  const result = await client.post(path + userID + "/class", data);
  const { instructor: instructorID } = result;

  const { id, imageURL, email, name } = await getUser({ userID: instructorID });
  return { ...result, instructor: { id, imageURL, email, name } };
}

export async function enrollToClassroom({ userID, classID }) {
  const response = await client.patch(`${path}/${userID}/enroll/${classID}`);
  return response;
}

export async function fetchClassroomData({ classID }) {
  return await client.get(`v1/class/${classID}`);
}
