import PropTypes from "prop-types";
import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { fetchUserClassroom } from "../../../action";
import { Spinner } from "../../../components";
import { Classrooms } from "./Classrooms";

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: true,
};

function classroomReducer(state, action) {
  switch (action.type) {
    case "CLASSROOM_FETCHING_FAILURE":
      return Object.assign({}, { error: action.payload, loading: false });

    case "CLASSROOM_FETCHING_SUCCESS":
      return Object.assign({}, { data: action.payload, loading: false });
  }

  return state;
}

const Loading = () => (
  <div className="flex justify-center items-center flex-col p-5 mt-5">
    <Spinner />
    <p className="mt-3 text-gray-700">Fetching User Classes</p>
  </div>
);

export const UserClassrooms = ({ userID }) => {
  const dispatch = useDispatch();

  const [store, localDispatch] = useReducer(classroomReducer, { ...INITIAL_STATE });

  useEffect(() => {
    const onSuccess = (data) =>
      localDispatch({ type: "CLASSROOM_FETCHING_SUCCESS", payload: data });

    const onError = (err) =>
      localDispatch({ type: "CLASSROOM_FETCHING_FAILURE", payload: err });

    dispatch(fetchUserClassroom({ userID, onSuccess, onError }));
  }, [userID, dispatch]);

  const { error, loading, data: classrooms } = store;

  if (loading) return <Loading />;

  if (error) {
    console.error(error);
    return null;
  }

  return <Classrooms classrooms={classrooms} userID={userID} />;
};

UserClassrooms.propTypes = {
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
