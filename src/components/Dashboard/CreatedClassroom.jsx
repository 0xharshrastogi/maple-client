/* eslint-disable react/prop-types */
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserClassrooms as UserClassroomsAction } from "../../action";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import Model from "../Model/Model";
import Spinner from "../Spinner/Spinner";

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

const ClassroomCard = ({ headerImage, name, description, ...props }) => {
  const { onEdit: handleEdit } = props;

  return (
    <div className="overflow-hidden rounded border">
      <div className="cardheader">
        <img src={headerImage} />
      </div>

      <div className="p-2">
        <div className="d-flex items-center justify-between mt-3">
          <h2 className="pr-1 font-medium text-md">{name}</h2>
          <div className="dropup">
            <button
              className="btn btn-light rounded-full dropdown-toogle"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li onClick={handleEdit}>
                <span className="dropdown-item">Edit</span>
              </li>
            </ul>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

const EditClassForm = ({ name: initialName, description: initialDiscription, handleClose }) => {
  const [name, setName] = React.useState(initialName);
  const [description, setDescription] = React.useState(initialDiscription);

  return (
    <form className="gap-2 d-flex flex-col my-2">
      <div className="col-sm-6">
        <label htmlFor="className">Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-gray-800"
          placeholder="New Name"
        />
        <br />
      </div>

      <div>
        <label htmlFor="className">Description</label>
        <br />
        <textarea
          type="text"
          value={description}
          className="text-gray-800 w-full"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
      </div>

      <div className="d-flex justify-end gap-2">
        <Button type="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button>Submit</Button>
      </div>
    </form>
  );
};

const CreatedClassrooms = () => {
  const [editClass, setEditClass] = React.useState(null);

  const auth = useAuth();
  const { loading: classroomsLoading, data } = useCreatedClassroom({ userID: auth.user.userID });

  if (classroomsLoading)
    return (
      <div>
        <Spinner />
        <p className="text-center -mt-12 text-gray-500">Fetching Classrooms....</p>
      </div>
    );

  return (
    <>
      {editClass && (
        <Model onClose={() => setEditClass(null)}>
          <h5 className="font-bold text-left">Edit Class</h5>
          <hr />

          <EditClassForm
            name={editClass.name}
            description={editClass.description}
            handleClose={() => setEditClass(null)}
          />
        </Model>
      )}

      <div className="p-2">
        <div className="row gap-3 gap-sm-0">
          {data.map((data) => (
            <div key={data.classID} className="col-12 col-sm-6 col-md-4">
              <Link to={`/class/${data.classID}/members`}>
                <ClassroomCard
                  classID={data.classID}
                  name={data.name}
                  description={data.description || "Lorem ipsum dolor sit amet."}
                  headerImage={data.headerImgUrl}
                  onEdit={() => setEditClass(data)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreatedClassrooms;
