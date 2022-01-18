import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewClassroom } from "../../api/classrooms";
import { Button } from "../../components";
import { user } from "../../reducers";

export const CreateClassRoomForm = ({ userId, onSubmit: handelSubmit }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handelCreateClass = async (e) => {
    e.preventDefault();

    const [data, err] = await createNewClassroom({ name }, userId);
    if (err) return console.error(err);

    dispatch({ type: user.pushClassrooms, payload: data });
    handelSubmit();
  };

  return (
    <>
      <h3 className="text-center text-3xl font-bold">Create</h3>

      <form className="mx-3 my-5 space-y-2">
        <div className="flex flex-col space-y-1">
          <label htmlFor="name">Enter Classroom Name</label>
          <input
            className="text-gray-600 rounded p-2"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Software Testing"
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handelCreateClass}>Submit</Button>
        </div>
      </form>
    </>
  );
};

CreateClassRoomForm.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
