import client from "./config";

export const createAndPublishNotification = async (body) => {
  if (!body?.classID) throw new Error("Class ID Required In Notification Data");
  if (!body?.title) throw new Error("Class ID required in body");

  return client.post("v1/notification", body);
};

export const getAllNotificationOfClassroom = (classID) => {
  return client.get(`/v1/${classID}/notification`);
};
