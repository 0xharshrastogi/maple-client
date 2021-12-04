import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { getUserEnrolledClassroom } from "../../api/classrooms";
import Spinner from "../../components/Spinner/Spinner";

const UserJoinedClassrooms = ({ userId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [data, err] = await getUserEnrolledClassroom(userId);
      if (err) setError(err);
      else setData(data);

      setIsLoading(false);
    })();
  }, [userId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center flex-col p-5 mt-5">
        <Spinner />
        <p className="mt-3 text-gray-700">Fetching User Classes</p>
      </div>
    );

  if (error) return console.error(error);

  const { count, results } = data;

  if (count === 0)
    return (
      <p className="mt-10 text-center text-red-600 font-semibold text-2xl bg-red-200 p-4 rounded">
        No Class Created
      </p>
    );

  return (
    <div className="mt-5 md:mx-auto lg:max-w-2xl">
      <div className="flex justify-between bg-red-600 px-2 rounded text-lg font-medium">
        <span className="text-white">Classroom Name</span>
        <span className="text-white">Instructor Name</span>
      </div>

      <div className="space-y-3 mt-2">
        {results.map((classroom) => (
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
  );
};

UserJoinedClassrooms.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default UserJoinedClassrooms;
