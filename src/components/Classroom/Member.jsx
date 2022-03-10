/* eslint-disable react/prop-types */
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { enrollToClassroom } from "../../api/server/classroom";
import { getAllUser } from "../../api/server/user";
import { useAuth } from "../../hooks";
import Model from "../Model/Model";
import "./member.css";

/** Sort Users In Ascending Order */
const sortByName = (userA, userB) => userA.firstname.charCodeAt(0) - userB.firstname.charCodeAt(0);

/** Model Form For Enrolling New User To Classroom */
const AddUserForm = ({ userID, onClose: closeHandler, onJoin: handleJoin }) => {
  const { classID } = useParams();
  const history = useHistory();
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  React.useEffect(() => {
    try {
      getAllUser().then((users) => {
        const removeAdmin = (user) => user.userID !== userID;
        const filtered = users.filter(removeAdmin).sort(sortByName);
        setUsers(filtered);
      });
    } catch (error) {
      setError(error);
    }
  }, [setError, setUsers, userID]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!selectedUser) throw new Error("No user/ Invalid user: Please check user is valid");
      const { userID } = selectedUser;
      await enrollToClassroom({ userID, classID });
      handleJoin(selectedUser);
      closeHandler();
      history.push(`/class/${classID}/members`);
    } catch (error) {
      if (error.statusCode === 404) return setError(new Error("Invalid Class Id: " + classID));
      setError(error);
    }
  };

  const resetHandler = () => {
    setSelectedUser(null);
    setError(null);
  };

  return (
    <form onSubmit={submitHandler} onReset={resetHandler}>
      {error && (
        <article className="alert alert-danger d-flex align-items-center">
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Danger:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span>{error.message}</span>
        </article>
      )}
      <div className="mb-4">
        <label htmlFor="personUserName" className="form-label">
          Enter User Name
        </label>
        <input
          id="personUserName"
          name="personUserID"
          placeholder="John Smith"
          autoComplete="off"
          className="form-control border-none text-white"
          style={{ backgroundColor: "#445064" }}
          list="person"
          onChange={(e) => {
            setError(null);
            const user = users.find((user) => e.target.value === user.userID);

            setSelectedUser(user ? user : null);
            if (user) {
              e.target.value = user.givenname;
            }
          }}
        />
        <datalist id="person">
          {users.sort(sortByName).map((user) => (
            <option key={user.userID} value={user.userID}>
              {user.givenname}
            </option>
          ))}
        </datalist>
      </div>

      {selectedUser && (
        <div className="my-3">
          <div className="row">
            <div>
              <strong>ID:</strong> {selectedUser.userID}
            </div>
            <div>
              <strong>Fullname:</strong> {selectedUser.givenname}
            </div>
          </div>

          <div className="row">
            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>
          </div>
        </div>
      )}

      <div>
        <input type="submit" className="btn btn-success mr-4" value="Submit" />
        <input type="reset" value="Reset" className="btn btn-secondary" />
      </div>
    </form>
  );
};

const Member = ({ data: classroom, onInsertNewUser: handleJoin }) => {
  const auth = useAuth();
  const [isAddUserFormOpen, setIsAddUserFormOpen] = React.useState(false);
  const toogleAddUserForm = () => setIsAddUserFormOpen(!isAddUserFormOpen);

  return (
    <section className="mt-3">
      <div className="d-flex justify-end">
        <button onClick={toogleAddUserForm} className="btn btn-danger">
          Add User
        </button>
      </div>

      {isAddUserFormOpen && (
        <Model onClose={toogleAddUserForm}>
          <AddUserForm onJoin={handleJoin} onClose={toogleAddUserForm} userID={auth.user.userID} />
        </Model>
      )}

      <section className="rounded shadow border-t-2 border-red-800 mt-3 sm:max-w-md md:max-w-lg mx-auto">
        {!classroom.loading && classroom.data.users.length === 0 && (
          <div className="container py-2 space-y-2">
            <span className="text-xl">No User Joined This Classroom</span>
          </div>
        )}

        {!classroom.loading && classroom.data.users.length > 0 && (
          <ol className="container py-2 space-y-2">
            {classroom.data.users.map((user) => (
              <li
                className="col-sm-3 d-flex items-center cursor-pointer gap-2 w-full member-item"
                key={user.userID}
              >
                <img
                  height={40}
                  width={40}
                  className="rounded-full"
                  src={user.imageURL}
                  alt={user.givenname}
                />
                <div className="container">
                  <div className="row">
                    <h5>{user.givenname}</h5>
                    <span>
                      <small>{user.email}</small>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </section>
  );
};

export default Member;
