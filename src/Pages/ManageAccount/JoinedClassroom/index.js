import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledClassroom } from "../../../api/classrooms";
import { Button, Model, Spinner } from "../../../components";
import { useAsync } from "../../../hooks";
import { user } from "../../../reducers";
import { JoinClassroomForm } from "./form";

export const UserJoinedClassrooms = ({ userId }) => {
  const { count: classCount, results: joinedClassroom } = useSelector(
    (state) => state?.user?.enrolledIn
  );
  const dispatch = useDispatch();

  const [portalActive, setPortalActive] = useState(false);

  const { loading, error } = useAsync(async () => {
    const [data, err] = await getUserEnrolledClassroom(userId);

    if (err) return console.error(err);

    dispatch({ type: user.insertJoinedClassrooms, payload: data });
  }, [userId]);

  // if (dispatch) return null;

  if (loading)
    return (
      <div className="flex justify-center items-center flex-col p-5 mt-5">
        <Spinner />
        <p className="mt-3 text-gray-700">Fetching User Classes</p>
      </div>
    );

  if (error) return console.error(error);

  const ButtonJSX = (
    <div className="my-5 text-right">
      <Button onClick={() => setPortalActive(true)}>Join Classroom</Button>
    </div>
  );

  const PortalJSX = (
    <Model onClose={() => setPortalActive(false)}>
      <JoinClassroomForm userId={userId} onClose={() => setPortalActive(false)} />
    </Model>
  );

  if (Array.isArray(joinedClassroom) && classCount === 0)
    return (
      <>
        {ButtonJSX}
        {portalActive && PortalJSX}
        <p className="mt-10 text-center text-red-600 font-semibold text-2xl bg-red-200 p-4 rounded">
          No Classroom Joined
        </p>
      </>
    );

  return (
    <>
      {ButtonJSX}
      {portalActive && PortalJSX}
      <div className="mt-5 md:mx-auto lg:max-w-2xl">
        <div className="flex justify-between bg-red-600 px-2 rounded text-lg font-medium">
          <span className="text-white">Classroom Name</span>
          <span className="text-white">Instructor Name</span>
        </div>

        <div className="space-y-3 mt-2">
          {joinedClassroom?.map((classroom) => (
            <div
              key={classroom.id}
              className="flex px-2 justify-between hover:bg-red-50 cursor-pointer rounded py-1 border-b-2"
            >
              <span className="text-gray-800">{classroom.name}</span>
              <span className="text-xs text-gray-400 flex items-center">
                {classroom.instructor.name.first} {classroom.instructor.name.last}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

UserJoinedClassrooms.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
