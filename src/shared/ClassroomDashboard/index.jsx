import PropTypes from "prop-types";
import React, { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { fetchClassdata } from "../../action";
import DashboardContext from "./DashboardContext";
import Navbar from "./Navbar";

const PATH_LIST = [
  { key: "details", name: "Details", path: location.pathname },
  { key: "classwork", name: "Classworks", path: location.pathname + "classwork" },
  { key: "people", name: "People", path: location.pathname + "people" },
];

function reducer(state, action) {
  switch (action.type) {
    case "CLASSROOM_DATA_FAILURE":
      return Object.assign({}, state, { loading: false, data: action.payload });

    case "CLASSROOM_DATA_SUCCESS":
      return Object.assign({}, state, { loading: false, data: action.payload });
  }
  return state;
}

const useClassSetup = ({ classID }) => {
  if (!classID) throw new Error("Class ID not passed");

  const dispatch = useDispatch();
  const [store, classroomDispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    console.count("Fetching Classdata");
    const handleError = (error) =>
      classroomDispatch({ type: "CLASSROOM_DATA_FAILURE", payload: error });

    const handleData = (data) =>
      classroomDispatch({ type: "CLASSROOM_DATA_SUCCESS", payload: data });

    dispatch(fetchClassdata({ classID, onError: handleError, onSuccess: handleData }));
  }, [classID, dispatch]);

  return { ...store };
};
export const ClassroomDashboard = ({ classID }) => {
  const data = useClassSetup({ classID });
  console.log(location.pathname);

  return (
    <DashboardContext.Provider value={data}>
      <Navbar basePath={location.pathname} list={PATH_LIST} />
      <Switch>
        <Route exact path={location.pathname + "/"} component={() => <h1>Hello</h1>} />

        <Route
          path={location.pathname + "/classwork"}
          component={() => <h1>Classworks</h1>}
        />

        <Route
          exact
          path={location.pathname + "/"}
          component={() => <h1>Classworks</h1>}
        />
      </Switch>
    </DashboardContext.Provider>
  );
};

ClassroomDashboard.propTypes = {
  classID: PropTypes.string.isRequired,
};
