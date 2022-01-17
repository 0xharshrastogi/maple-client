import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getClassroomData, joinClassRoom } from "../../api/classrooms";
import Button from "../../components/Button/Button";
import { userActionType } from "../../reducers/user";

const JoinClassroomForm = ({ userId, onClose: handleClose }) => {
  const [classId, setClassId] = useState("");
  const [error, setError] = useState(null);
  const [classData, setClassData] = useState(null);
  const dispatch = useDispatch();

  let rendredJSX = null;
  if (classData)
    rendredJSX = (
      <div className="text-center mx-3 mt-5 md:w-96 flex flex-col items-center">
        <p className="text-2xl font-bold">{classData.name}</p>
        <div className="h-14 w-14 overflow-hidden object-cover rounded-full flex justify-center items-center border-2 border-white mt-4">
          <img
            className="w-full"
            src={classData.instructor.imageURL}
            alt="Instructor Image"
          />
        </div>
        <p className="mt-4">
          Instructor: {classData.instructor.name.first} {classData.instructor.name.last}
        </p>

        <div className="space-x-2 mt-6 flex justify-between self-stretch">
          <Button full type="secondary" onClick={() => setClassData(null)}>
            Close
          </Button>
          <Button
            full
            onClick={async () => {
              const [, error] = await joinClassRoom(userId, classId);
              if (error) return console.error(error);
              console.log(typeof handleClose);
              handleClose();
              dispatch({ type: userActionType.pushJoinedClassroom, payload: classData });
            }}
          >
            Join
          </Button>
        </div>
      </div>
    );
  else
    rendredJSX = (
      <form className="mx-3 my-5 space-y-2">
        {error && (
          <p className="text-red-600 font-bold">
            {error.name}: {error.message}
          </p>
        )}
        <div className="flex flex-col space-y-1">
          <label htmlFor="name">Enter Classroom ID</label>
          <input
            className="text-gray-600 rounded p-2"
            type="text"
            name="classId"
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              classId && error && setError(null);
            }}
            placeholder="Software Testing"
          />
        </div>

        <div className="flex justify-end">
          <Button
            full
            onClick={async (e) => {
              e.preventDefault();
              if (!classId) return setError(new Error("Class ID Cann't Be Empty"));
              const [classroomData, err] = await getClassroomData(classId);

              if (err) {
                if (err.message.includes("Cast to ObjectId failed for value"))
                  return setError(new Error("Invalid User Id"));

                const e = new Error(err.message);
                setError(e);
              }
              setClassData(classroomData);
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    );

  return (
    <>
      <h3 className="text-center text-3xl font-bold">Join</h3>

      {rendredJSX}
    </>
  );
};

JoinClassroomForm.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JoinClassroomForm;
