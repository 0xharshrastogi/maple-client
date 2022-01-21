import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ children, to }) => {
  const isActive = to === window.location.pathname;
  return (
    <Link
      to={to}
      className={`${
        isActive ? "bg-white bg-opacity-10" : ""
      } p-2 font-medium text-sm md:text-base uppercase transition-all duration-100 ease-in rounded-sm hover:bg-white hover:bg-opacity-10`}
    >
      {children}
    </Link>
  );
};

Tab.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export const TabBar = ({ tabs }) => {
  return (
    <nav className="mx-3 mt-10 px-4 py-4 flex justify-between sm:justify-around bg-indigo-800 text-white">
      {tabs.map(({ path, name }) => (
        <Tab to={path} key={path}>
          {name}
        </Tab>
      ))}
    </nav>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.array.isRequired,
};
