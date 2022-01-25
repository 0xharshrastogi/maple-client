/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/img/logo.svg";
import Button from "../Button/Button";
import "./Navbar.css";
import RenderUserJSX from "./UserMenu";

const Navbar = ({ logo }) => {
  const { isLoggedIn, user } = useSelector((store) => {
    return { isLoggedIn: store.isSignedIn, user: store.user };
  });

  const { data: userData } = user;

  return (
    <nav className="flex items-center justify-between py-3 px-2 navbar md:px-9">
      <Link to="/">
        <h3 className="flex items-center space-x-2">
          <img src={brandLogo} alt="Logo" className="h-12 sm:h-14" />
          <span className="text-2xl sm:text-4xl text-red-600 font-bold">mapple</span>
        </h3>
      </Link>
      {/* will render default untill logo is requiredOnly*/}

      {!logo && !isLoggedIn && (
        <div className="space-x-3 sm:space-x-10">
          <Button to="/login">Login</Button>
          <Button to="/signup" type="secondary">
            Signup
          </Button>
        </div>
      )}

      {!logo && isLoggedIn && (
        <RenderUserJSX
          email={userData.email}
          fullname={userData.fullname}
          imageSRC={userData.imageURL}
        />
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
