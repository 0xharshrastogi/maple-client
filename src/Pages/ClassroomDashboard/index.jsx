/* eslint-disable react/prop-types */
import React from "react";
import { Route, useParams } from "react-router-dom";
import { fetchClassroomData } from "../../api/server/classroom";
import Member from "../../components/Classroom/Member";
import Resource from "../../components/Resource/Resource";
import Stream2 from "../../components/Stream/Stream.v2";
import Tabs from "../../components/Tabs/Tabs";

const INITIAL_DATA = { data: null, loading: true, error: null };

const ActionType = {
  dataFetchSuccess: "CLASSDATA_FETCH_SUCESS",
  dataFetchFailure: "CLASSDATA_FETCH_FAILURE",
  pushNewParticipant: "CLASSDATA_PUSH_ENROLLED_PARTICIPANT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.dataFetchSuccess:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case ActionType.dataFetchFailure:
      return Object.assign({}, state, { data: null, error: action.payload, loading: false });
    case ActionType.pushNewParticipant: {
      if (!state.data) throw new Error("Classroom Data Not Found: Cann't Insert New Enrolled User");
      const { users } = state.data;
      users.push(action.payload);
      state.data.users = users.map((user) => Object.assign({}, user));
      return Object.assign({}, state);
    }
  }
};

const useClassroomData = (classID) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_DATA);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await fetchClassroomData({ classID });
        dispatch({ type: ActionType.dataFetchSuccess, payload: data });
      } catch (error) {
        dispatch({ type: ActionType.dataFetchFailure, payload: error });
      }
    })();
  }, [classID]);

  const insertNewEnrolledUser = (user) =>
    dispatch({ type: ActionType.pushNewParticipant, payload: user });

  return { ...state, insertNewEnrolledUser };
};

export const ClassroomDashboard = () => {
  const { classID } = useParams();
  const classroom = useClassroomData(classID);

  return (
    <>
      <div className="container">
        <div className="mb-4">
          <h1 className="display-3 text-red-600 font-bold">
            {classroom.loading ? "Fetching..." : classroom.data.name}
          </h1>
          <small className="text-base text-gray-500">
            <strong>Created By:</strong>{" "}
            {classroom.loading ? "Fetching..." : classroom.data.admin.givenname}
          </small>
        </div>

        <div className="mb-3">
          <Tabs.Container>
            <Tabs.Item to={`/class/${classID}/stream`}>Stream</Tabs.Item>
            <Tabs.Item to={`/class/${classID}/members`}>Members</Tabs.Item>
            <Tabs.Item to={`/class/${classID}/resource`}>Resource</Tabs.Item>
            <Tabs.Item to={`/class/${classID}/feed`}>Feed</Tabs.Item>
          </Tabs.Container>
        </div>

        <hr />

        <Route
          path={`/class/${classID}/feed`}
          render={() => {
            return <div>Feed</div>;
          }}
        />
        <Route
          path={`/class/:classID/members`}
          render={() => (
            <Member onInsertNewUser={classroom.insertNewEnrolledUser} data={classroom} />
          )}
        />
        {!classroom.loading && (
          <Route
            exact
            path={`/class/:classID/stream`}
            component={() => <Stream2 classData={classroom} />}
          />
        )}

        <Route path="/class/:classID/resource" render={() => <Resource classID={classID} />} />
      </div>
    </>
  );
};
