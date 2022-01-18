import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ children, to }) => {
  const isActive = to === window.location.pathname;
  return (
    <Link
      to={to}
      className={`${
        isActive ? "text-red-600 font-bold" : "text-gray-400 hover:text-red-500"
      } text-lg font-medium transition-all duration-100 ease-in`}
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
    <nav className="mx-10 px-4 py-4 flex justify-around bg-gray-50 border-2 border-gray-100">
      {tabs.map(({ path, name }) => (
        <Tab to={path} key={path}>
          {name}
        </Tab>
      ))}
    </nav>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.objectOf({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
