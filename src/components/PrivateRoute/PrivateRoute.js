import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../hooks";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  // const { isSignedIn: auth } = store.getState();

  console.log(auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth ? (
          <Component {...props} />
        ) : (
          // eslint-disable-next-line react/prop-types
          <Redirect to={{ pathname: "/login", state: props.location }} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  rest: PropTypes.object,
};
