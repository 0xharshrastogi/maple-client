import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './button.css';

const buttonStyles = {
  primary:
    'bg-red-600 text-gray-50 py-2 px-2 sm:py-2 sm:px-3.5 rounded-2xl font-bold pointer hover:bg-red-700 btn',
  secondary:
    'bg-gray-300 text-gray-700 py-2 px-2 sm:py-2 sm:px-3.5 rounded-2xl font-bold pointer hover:bg-gray-400 btn',
};

/**
 * Button Props
 *
 * @typedef {Object} ButtonProps
 *
 * @property {string} children label text for button
 * @property {"primary"|"secondary"} type varient of button
 *
 *  -primary: Red Background and White Text
 *
 *  -secondary: Grey Background and Black Text
 *
 * @property {boolean} disabled
 */

/**
 * Component For Button
 * @param {ButtonProps} props
 *
 */

const Button = ({ children, type, disabled, to, full, ...rest }) => {
  if (to)
    return (
      <Link
        to={to}
        className={`${full && 'inline-block w-full'} ${buttonStyles[type]} text-center`}
        {...rest}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={`${full && 'inline-block w-full'} ${buttonStyles[type]}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: 'Button Label',
  type: 'primary',
  to: '',
  full: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  full: PropTypes.bool,
  rest: PropTypes.object,
};

export default Button;
