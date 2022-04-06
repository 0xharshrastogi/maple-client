import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import { UserClassrooms as UserClassroomsAction } from "../../action";
import { useAuth } from "../../hooks";
import "./Dashboard.css";
import JoinedClassrooms from "./JoinedClassrooms";

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

const Dashboard = () => {
  const auth = useAuth();
  console.log(auth);
  const created = useCreatedClassroom({ userID: auth.user.userID });
  console.log(created);
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto">
          <button className="btn btn-primary shadow-md">
            <FontAwesomeIcon color="white" icon={faPlus} size={10} /> Create Classroom
          </button>
        </div>
      </div>

      <section>
        <div className="row mt-3">
          <div className="col-11 mx-auto p-3 rounded shadow-sm">
            <ul className="nav nav-tabs nav-fill">
              <li className="nav-item">
                <NavLink className="nav-link" to="/manage2/joined" activeClassName="active">
                  Joined Classroom
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manage2/created" activeClassName="active">
                  Created Classroom
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link disabled"
                  to="/manage2/requests"
                  activeClassName="active"
                >
                  Requests
                </NavLink>
              </li>
            </ul>

            <div className="row">
              <div className="container">
                <Route path="/manage2/created" component={JoinedClassrooms} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
