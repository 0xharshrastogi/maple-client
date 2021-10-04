import PropTypes from 'prop-types';
import React from 'react';
import './button.css';

const buttonStyles = {
  primary:
    'bg-red-600 text-gray-50 py-2 px-2 sm:py-2 sm:px-3.5 rounded-2xl font-bold pointer hover:bg-red-700 btn',
  secondary:
    'bg-gray-300 text-gray-700 py-2 px-2 sm:py-2 sm:px-3.5 rounded-2xl font-bold pointer hover:bg-gray-400 btn',
};

const Button = ({ children, type, disabled }) => {
  return (
    <button className={buttonStyles[type]} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: 'Button Label',
  type: 'primary',
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
