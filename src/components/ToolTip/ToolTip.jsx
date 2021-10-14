import PropTypes from 'prop-types';
import React from 'react';
import './ToolTip.css';

export const ToolTipWrapper = ({ children }) => {
  return <div className="relative tooltip-wrapper">{children}</div>;
};

const ToolTip = ({ children, direction }) => {
  return (
    <div
      className={`shadow-lg bg-gray-800 text-gray-300 absolute p-4 rounded-md tooltip-${direction}`}
    >
      {children}
    </div>
    // </div>
  );
};

ToolTipWrapper.propTypes = {
  children: PropTypes.object.isRequired,
};

ToolTip.defaultValue = {
  children: null,
  direction: 'right',
};

ToolTip.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
};

export default ToolTip;
