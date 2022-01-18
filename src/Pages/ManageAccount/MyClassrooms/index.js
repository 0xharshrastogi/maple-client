import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserClass } from "../../../api/classrooms";
import { Button, Model, Spinner } from "../../../components";
import { user } from "../../../reducers";
import { parseDate } from "../../../utils/parseDate";
import CreateClassRoomForm from "./form";

export const UserClassrooms = ({ userId }) => {
  const classrooms = useSelector((store) => store.user.classrooms);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortalActive, setIsPortalActive] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);

        const [data, err] = await getUserClass(userId);
        if (err) throw err;
        else dispatch({ type: user.addClassrooms, payload: data.result });
      })();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center flex-col p-5 mt-5">
        <Spinner />
        <p className="mt-3 text-gray-700">Fetching User Classes</p>
      </div>
    );
  if (error) return console.error(error);

  const PortalJSX = (
    <Model onClose={() => setIsPortalActive(false)}>
      <CreateClassRoomForm onSubmit={() => setIsPortalActive(false)} userId={userId} />
    </Model>
  );

  if (classrooms.length === 0)
    return (
      <>
        <div className="flex justify-end mt-5">
          <Button type="primary" onClick={() => setIsPortalActive(true)}>
            Create
          </Button>
        </div>

        {isPortalActive && PortalJSX}

        <p className="mt-10 text-center text-red-600 font-semibold text-2xl bg-red-200 p-4 rounded">
          No Class Created
        </p>
      </>
    );

  return (
    <>
      <div className="flex justify-end mt-5">
        <Button type="primary" onClick={() => setIsPortalActive(true)}>
          Create
        </Button>
      </div>

      {isPortalActive && PortalJSX}

      <div className="my-5 md:mx-auto lg:max-w-2xl">
        <div className="flex justify-between bg-red-600 px-2 rounded text-lg font-medium">
          <span className="text-white">Classroom Name</span>
          <span className="text-white">Created At</span>
        </div>

        <div className="space-y-3 mt-2">
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
              className="flex px-2 justify-between hover:bg-red-50 cursor-pointer rounded py-1 border-b-2"
            >
              <span className="text-gray-800">{classroom.name}</span>
              <span className="text-xs text-gray-400">
                {parseDate(new Date(classroom.createdAt))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

UserClassrooms.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
