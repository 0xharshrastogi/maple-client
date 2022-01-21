/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import RenderUserJSX from "./UserMenu";

/**
 * Props Of Navbar
 *
 * @typedef {Object} NavbarProps
 *
 * @property {boolean} logo If true renders only the brand logo in navbar
 */

/**
 * Component for Navbar
 *
 * @param {NavbarProps} props
 */

const LeftIcon = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-2">
        <span className="uppercase text-lg sm:inline sm:font-medium sm:text-2xl">
          mapple
        </span>
      </div>
    </Link>
  );
};

const ActionButtonGroup = () => (
  <div className="space-x-4 sm:space-x-10">
    <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
  </div>
);

const UserProfile = () => {
  const { user } = useSelector((store) => {
    return { user: store.user };
  });

  const { data: userData } = user;

  return (
    <RenderUserJSX
      email={userData.email}
      fullname={userData.fullname}
      imageSRC={userData.imageURL}
    />
  );
};

const Navbar = () => {
  const { isSignedIn: login } = useSelector((store) => store);
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-uiBlue text-uiWhite shadow-sm sm:px-7 md:px-14 lg:px-20">
      <LeftIcon />
      {login ? <UserProfile /> : <ActionButtonGroup />}
    </nav>
  );
};

Navbar.defaultProps = {
  logo: false,
};

Navbar.propTypes = {
  logo: PropTypes.bool,
};

export default Navbar;
