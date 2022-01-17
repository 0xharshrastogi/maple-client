import React from "react";
import { useParams } from "react-router-dom";

const ClassroomDashboard = () => {
  const { classId } = useParams();
  return <div>Hello {classId}</div>;
};

export default ClassroomDashboard;
