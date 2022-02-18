import PropTypes from "prop-types";
import React, { useState } from "react";
import server from "../../../api/server";
import { Button } from "../../../components";
// ClassData
// {
//   "_id": "620a6ee7e004b71a5f28cc8b",
//   "name": "Heathcote LLC",
//   "subjectName": "",
//   "headerImgUrl": "https://gstatic.com/classroom/themes/img_breakfast.jpg",
//   "description": "",
//   "admin": {
//       "_id": "620a5985e004b71a5f28cc5f",
//       "userID": "1644845445094",
//       "firstname": "Lonnie",
//       "imageURL": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1191.jpg",
//       "email": "lonnie.parisian42@hotmail.com",
//       "familyname": "Parisian",
//       "givenname": "Lonnie Parisian",
//       "__v": 0
//   },
//   "classID": "zjQl2Ei",
//   "createdAt": "2022-02-14T15:01:59.894Z",
//   "updatedAt": "2022-02-14T15:01:59.894Z",
//   "__v": 0
// }
export const JoinClassroomForm = ({ onSubmit: submitHandler }) => {
  const [classID, setClassID] = useState("");
  const [error, setError] = useState(null);
  const [classData, setClassData] = useState(null);

  let rendredJSX = null;

  if (classData)
    rendredJSX = (
      <div className="text-center mx-3 mt-5 md:w-96 flex flex-col items-center">
        <p className="text-2xl font-bold">{classData.name}</p>
        <div className="h-14 w-14 overflow-hidden object-cover rounded-full flex justify-center items-center border-2 border-white mt-4">
          <img className="w-full" src={classData.admin.imageURL} alt="Instructor Image" />
        </div>
        <p className="mt-4">Instructor: {classData.admin.givenname}</p>

        <div className="space-x-2 mt-6 flex justify-between self-stretch">
          <Button full type="secondary" onClick={() => setClassData(null)}>
            Close
          </Button>
          <Button full onClick={() => submitHandler({ classID })}>
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
            name="classID"
            value={classID}
            onChange={(e) => {
              setClassID(e.target.value);
              classID && error && setError(null);
            }}
            placeholder="Subject Name"
          />
        </div>

        <div className="flex justify-end">
          <Button
            full
            onClick={async (e) => {
              e.preventDefault();
              if (!classID) return setError(new Error("Class ID Cann't Be Empty"));

              try {
                const classData = await server.Classroom.fetchData({ classID });
                setClassData(classData);
              } catch (error) {
                if (error.message.includes("Cast to ObjectId failed for value"))
                  return setError(new Error("Invalid Classroom Id"));

                const e = new Error(error.message);
                setError(e);
              }
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
  onSubmit: PropTypes.func.isRequired,
};
