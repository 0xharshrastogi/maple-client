import React from "react";
import { NavLink, Route } from "react-router-dom";
import { CreateClassroomButton } from "./CreateClassroomButton";
import CreatedClassrooms from "./CreatedClassroom";
import "./Dashboard.css";
import { JoinClassroomButton } from "./JoinClassroomButton";
import JoinedClassrooms from "./JoinedClassroom";

const Dashboard = () => {
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-11 mx-auto">
          <Route path="/manage2/created" component={CreateClassroomButton} />
          <Route path="/manage2/joined" component={JoinClassroomButton} />
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
                <Route path="/manage2/joined" component={JoinedClassrooms} />
                <Route path="/manage2/created" component={CreatedClassrooms} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
