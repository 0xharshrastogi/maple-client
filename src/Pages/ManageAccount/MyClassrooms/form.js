import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button } from "../../../components";

const CreateClassRoomForm = ({ onSubmit: handelSubmit }) => {
  const [name, setName] = useState("");

  const handelCreateClass = async (e) => {
    e.preventDefault();
    handelSubmit({ name });
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

export default CreateClassRoomForm;
