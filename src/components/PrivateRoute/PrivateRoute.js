import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const isSignIn = useSelector((state) => state?.isSignedIn);

  if (!isSignIn) return <Redirect to="/"></Redirect>;

  return <Route {...rest}>{children}</Route>;
};

PrivateRoute.propTypes = {
  rest: PropTypes.object,
  children: PropTypes.node,
};
