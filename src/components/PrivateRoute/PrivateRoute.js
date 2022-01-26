import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks";

const Private = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  const Render = (props) => {
    return auth.isLogin() ? (
      <Component />
    ) : (
      // eslint-disable-next-line react/prop-types
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  };

  return <Route {...rest} render={Render} />;
};

Private.propTypes = {
  component: PropTypes.func,
};

export default Private;
