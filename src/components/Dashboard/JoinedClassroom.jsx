import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserClassrooms } from "../../action";
import { useAuth } from "../../hooks";
import Spinner from "../Spinner/Spinner";

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

const JoinedClassroom = () => {
  const auth = useAuth();
  const { userID } = auth.user;
  const { loading, data, error } = useEnrolledClassrooms({ userID });
  console.log({ loading });
  if (loading)
    return (
      <div>
        <Spinner />
        <p className="text-center -mt-12 text-gray-500">Fetching Classrooms....</p>
      </div>
    );

  if (error) alert(error.message);

  if (data.length == 0)
    return (
      <div className="p-2 mt-3">
        <h5 className="text-center display-6 text-red-600">No Classroom Joined</h5>
      </div>
    );
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default JoinedClassroom;
