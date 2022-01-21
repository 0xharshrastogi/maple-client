import PropTypes from "prop-types";
import React from "react";
import { SecondaryButton } from "./secondary";

export const Button = ({ children, type }) => {
  switch (type) {
    case "primary":
      return <button>{children}</button>;

    case "secondary":
      return <SecondaryButton>{children}</SecondaryButton>;

    default:
      return <button>{children}</button>;
  }
};

Button.defaultValues = {
  type: "primary",
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
};
