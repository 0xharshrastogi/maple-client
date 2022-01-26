import PropTypes from "prop-types";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserEnrolledClassrooms } from "../../../action";
import { Button, Model, Spinner } from "../../../components";
import { JoinClassroomForm } from "./form";

function classroomReducer(state, action) {
  switch (action.type) {
    case "CLASSROOM_FETCHING_FAILURE":
      return Object.assign({}, { error: action.payload, loading: false });

    case "CLASSROOM_FETCHING_SUCCESS":
      return Object.assign({}, { data: action.payload, loading: false });
  }

  return state;
}

export const UserJoinedClassrooms = ({ userID }) => {
  const [portalActive, setPortalActive] = useState(false);
  const dispatch = useDispatch();
  const [store, localDispatch] = useReducer(classroomReducer, {
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    const onErrorHandler = (error) =>
      localDispatch({ type: "CLASSROOM_FETCHING_FAILURE", payload: error });

    const onSuccessHandler = (data) =>
      localDispatch({ type: "CLASSROOM_FETCHING_SUCCESS", payload: data });

    dispatch(
      fetchUserEnrolledClassrooms({
        userID,
        onError: onErrorHandler,
        onSuccess: onSuccessHandler,
      })
    );
  }, [userID, dispatch]);

  const { data: classrooms, loading, error } = store;
  console.log(classrooms);

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
      <JoinClassroomForm userId={userID} onClose={() => setPortalActive(false)} />
    </Model>
  );

  if (!classrooms.length)
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
          {classrooms?.map((classroom) => (
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
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
