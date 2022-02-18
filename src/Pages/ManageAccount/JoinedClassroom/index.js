import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserClassrooms } from "../../../action";
import { Button, Model, Spinner } from "../../../components";
import { JoinClassroomForm } from "./form";

const useEnrolledClassrooms = ({ userID }) => {
  const result = useSelector(({ userEnrolledClassrooms }) => userEnrolledClassrooms);
  const dispatch = useDispatch();

  const join = React.useCallback(
    ({ classID }) => {
      if (!classID) throw new Error("Class ID Not Passed");
      dispatch(UserClassrooms.join({ userID, classID }));
    },
    [dispatch, userID]
  );

  React.useEffect(() => {
    dispatch(UserClassrooms.enrolled.list({ userID }));
  }, [dispatch, userID]);

  return React.useMemo(
    () => ({ data: result.data, loading: result.loading, error: result.error, join }),
    [result, join]
  );
};
// {admin: "620a5985e004b71a5f28cc5f"
// classID: "akSN55x"
// createdAt: "2022-02-14T15:03:25.735Z"
// description: ""
// headerImgUrl: "https://gstatic.com/classroom/themes/img_breakfast.jpg"
// name: "Quitzon - Wisoky"
// subjectName: ""
// updatedAt: "2022-02-14T15:03:25.735Z"}
export const UserJoinedClassrooms = ({ userID }) => {
  const enrolled = useEnrolledClassrooms({ userID });
  const [portalActive, setPortalActive] = useState(false);
  const onSubmitHandler = React.useCallback(
    ({ classID }) => {
      setPortalActive(false);
      enrolled.join({ classID });
    },
    [enrolled]
  );

  const { data: classrooms, loading, error } = enrolled;
  let ErrorJSX = null;

  if (loading)
    return (
      <div className="flex justify-center items-center flex-col p-5 mt-5">
        <Spinner />
        <p className="mt-3 text-gray-700">Fetching User Classes</p>
      </div>
    );

  if (error) {
    console.error(error);

    ErrorJSX = (
      <div className="mt-4 text-center bg-red-200 p-5 text-red-700  ">
        {error.message}
      </div>
    );
  }

  const ButtonJSX = (
    <div className="my-5 text-right">
      <Button onClick={() => setPortalActive(true)}>Join Classroom</Button>
    </div>
  );

  const PortalJSX = (
    <Model onClose={() => setPortalActive(false)}>
      <JoinClassroomForm
        onSubmit={onSubmitHandler}
        userId={userID}
        onClose={() => setPortalActive(false)}
      />
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
      {ErrorJSX}
      {portalActive && PortalJSX}
      <div className="mt-5 md:mx-auto lg:max-w-2xl">
        <div className="flex justify-between bg-red-600 px-2 rounded text-lg font-medium">
          <span className="text-white">Classroom Name</span>
          <span className="text-white">Instructor Name</span>
        </div>

        <div className="space-y-3 mt-2">
          {classrooms?.map((classroom) => (
            <div
              key={classroom.classID}
              className="flex px-2 justify-between hover:bg-red-50 cursor-pointer rounded py-1 border-b-2"
            >
              <span className="text-gray-800">{classroom.name}</span>
              <span className="text-xs text-gray-400 flex items-center">
                {classroom.admin.givenname}
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
