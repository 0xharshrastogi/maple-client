/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import brandLogo from '../../assets/img/logo.svg';
import Button from '../Button/Button';
import './Navbar.css';

/**
 * Props Of Navbar
 *
 * @typedef {Object} NavbarProps
 *
 * @property {boolean} logo If true renders only the brand logo in navbar
 */

// /**
//  *
//  * @param {NavbarProps} props
//  * @returns {JSX}
//  */

/**
 * Component for Navbar
 *
 * @param {NavbarProps} props
 */

const Navbar = ({ logo }) => {
  const isSignedIn = useSelector((store) => store.isSignedIn);

  const handleLogOut = useCallback(() => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  }, [isSignedIn, history]);

  return (
    <nav className="flex items-center justify-between py-3 px-2 navbar md:px-9">
      <h3 className="flex items-center space-x-2">
        <img src={brandLogo} alt="Logo" className="h-12 sm:h-14" />
        <span className="text-2xl sm:text-4xl text-red-600 font-bold">Mapple</span>
      </h3>
      {/* will render default untill logo is requiredOnly*/}

      {!logo && !isSignedIn && (
        <div className="space-x-3 sm:space-x-10">
          <Button to="/login">Login</Button>
          <Button to="/signup" type="secondary">
            Signup
          </Button>
        </div>
      )}

      {!logo && isSignedIn && (
        <div className="space-x-3 sm:space-x-10">
          <Button onClick={handleLogOut}>Logout</Button>
        </div>
      )}
    </nav>
  );
};

Navbar.defaultProps = {
  logo: false,
};

Navbar.propTypes = {
  /**
   * If true, then is only renders the logo of navbar
   */
  logo: PropTypes.bool,
};

export default Navbar;
