import PropTypes from "prop-types";
import React from "react";

export const SecondaryButton = ({ children }) => {
  return (
    <button className="bg-white text-uiBlue p-1 rounded-sm shadow-sm">{children}</button>
  );
};

SecondaryButton.propTypes = {
  children: PropTypes.node,
};
