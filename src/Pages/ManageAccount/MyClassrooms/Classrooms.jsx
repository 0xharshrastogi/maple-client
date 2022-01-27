import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Model } from "../../../components";
import { parseDate } from "../../../utils";
import Form from "./form";

const FormPortal = ({ onClose, onSubmit, userID }) => {
  return (
    <Model onClose={onClose}>
      <Form onSubmit={onSubmit} userId={userID} />
    </Model>
  );
};

export const Classrooms = ({ classrooms, userID, onCreate: createHandler }) => {
  const [isPortalActive, setIsPortalActive] = useState(false);

  const closePortalHandler = React.useCallback(
    (data) => {
      setIsPortalActive(false);
      createHandler(data);
    },
    [createHandler]
  );

  const openPortalHandler = () => setIsPortalActive(true);

  const Form = () => (
    <FormPortal
      userID={userID}
      onClose={closePortalHandler}
      onSubmit={closePortalHandler}
    />
  );

  if (!classrooms.length)
    return (
      <>
        <div className="flex justify-end mt-5">
          <Button type="primary" onClick={openPortalHandler}>
            Create
          </Button>
        </div>

        {isPortalActive && <Form />}

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

      {isPortalActive && <Form />}

      <div className="my-5 md:mx-auto lg:max-w-2xl">
        <div className="flex justify-between bg-red-600 px-2 rounded text-lg font-medium">
          <span className="text-white">Classroom Name</span>
          <span className="text-white">Created At</span>
        </div>

        <ul className="space-y-3 mt-2">
          {classrooms.map((classroom) => (
            <li
              title="Click To Copy Code"
              onClick={() =>
                navigator?.clipboard
                  .writeText(classroom.id)
                  .catch((reason) => console.log("Failed For:", reason))
              }
              key={classroom.id}
              className="flex px-2 justify-between hover:bg-red-50 cursor-pointer rounded py-1 border-b-2"
            >
              <span className="text-gray-800">{classroom.name}</span>
              <span className="text-xs text-gray-400">
                {parseDate(new Date(classroom.createdAt))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

FormPortal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};

Classrooms.propTypes = {
  onCreate: PropTypes.func.isRequired,
  classrooms: PropTypes.array.isRequired,
  userID: PropTypes.string.isRequired,
};
