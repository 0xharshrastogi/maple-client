import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardContext from "./DashboardContext";
import DetailScreen from "./DetailScreen";
import Navbar from "./Navbar";
import { useClassSetup } from "./useClassSetup";
import { useConfig } from "./useConfig";

export const ClassroomDashboard = ({ classID }) => {
  const data = useClassSetup({ classID });
  const ConfigProvider = useConfig({ detailJumboTronOpened: false });

  return (
    <DashboardContext.Provider value={data}>
      <Navbar
        basePath={location.pathname}
        list={[
          { key: "details", name: "Details", path: location.pathname },
          { key: "classwork", name: "Classworks", path: location.pathname + "classwork" },
          { key: "people", name: "People", path: location.pathname + "people" },
        ]}
      />

      <ConfigProvider>
        <Switch>
          <Route exact path={location.pathname + "/"} component={DetailScreen} />

          <Route
            path={location.pathname + "classwork"}
            component={() => <h1>Classworks</h1>}
          />

          <Route
            exact
            path={location.pathname + "people"}
            component={() => <h1>People</h1>}
          />
        </Switch>
      </ConfigProvider>
    </DashboardContext.Provider>
  );
};

ClassroomDashboard.propTypes = {
  classID: PropTypes.string.isRequired,
};
