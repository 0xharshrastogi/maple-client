import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/img/logo.svg";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import "./Navbar.css";
import RenderUserJSX from "./UserMenu";

const Navbar = ({ logo }) => {
  const { user, isLogin, signout: signoutHandler } = useAuth();
  const login = isLogin();

  return (
    <nav className="flex items-center justify-between py-3 px-2 navbar md:px-9">
      <Link to="/">
        <h3 className="flex items-center space-x-2">
          <img src={brandLogo} alt="Logo" className="h-12 sm:h-14" />
          <span className="text-2xl sm:text-4xl text-red-600 font-bold">mapple</span>
        </h3>
      </Link>

      {!logo && !login && (
        <div className="space-x-3 sm:space-x-10">
          <Button to="/login">Login</Button>
          <Button to="/signup" type="secondary">
            Signup
          </Button>
        </div>
      )}

      {!logo && login && (
        <RenderUserJSX
          email={user.email}
          fullname={user.fullname}
          imageSRC={user.imageURL}
          onSignout={signoutHandler}
        />
      )}
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
