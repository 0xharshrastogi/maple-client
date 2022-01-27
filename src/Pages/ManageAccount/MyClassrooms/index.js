import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserClassrooms as UserClassroomsAction } from "../../../action";
import { Spinner } from "../../../components";
import { Classrooms } from "./Classrooms";

const useCreatedClassroom = ({ userID }) => {
  const dispatch = useDispatch();
  const result = useSelector(({ userCreatedClassrooms }) => {
    return userCreatedClassrooms;
  });

  const create = React.useCallback(
    (data) => {
      dispatch(UserClassroomsAction.create({ userID, data }));
    },
    [dispatch, userID]
  );

  React.useEffect(() => {
    dispatch(UserClassroomsAction.created.list({ userID }));
  }, [dispatch, userID]);

  return { create, loading: result.loading, error: result.error, data: result.data };
};

const Loading = () => (
  <div className="flex justify-center items-center flex-col p-5 mt-5">
    <Spinner />
    <p className="mt-3 text-gray-700">Fetching User Classes</p>
  </div>
);

export const UserClassrooms = ({ userID }) => {
  const classrooms = useCreatedClassroom({ userID });

  if (classrooms.loading) return <Loading />;

  if (classrooms.error) {
    console.error(classrooms.error);
    return null;
  }
  console.count("User Classrooms Created Render");
  return (
    <Classrooms
      onCreate={classrooms.create}
      classrooms={classrooms.data}
      userID={userID.toString()}
    />
  );
};

UserClassrooms.propTypes = {
  userID: PropTypes.any,
};
