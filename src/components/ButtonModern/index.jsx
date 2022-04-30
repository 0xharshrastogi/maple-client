import PropTypes from "prop-types";
import React from "react";
import { SecondaryButton } from "./secondary";

export const Button = ({ children, type, ...rest }) => {
  console.log(rest);
  switch (type) {
    case "primary":
      return <button {...rest}>{children}</button>;

    case "secondary":
      return <SecondaryButton {...rest}>{children}</SecondaryButton>;

    default:
      return <button {...rest}>{children}</button>;
  }
};

Button.defaultValues = {
  type: "primary",
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  rest: PropTypes.object,
};
