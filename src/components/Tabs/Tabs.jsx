/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";
import "./tabs.css";

const Item = (props) => {
  const { to, children } = props;
  return (
    <NavLink className="nav-link tabItem" activeClassName="active bg-red-600" to={to}>
      {children}
    </NavLink>
  );
};

const Container = ({ children }) => {
  return (
    <ul className="nav nav-pills flex-column flex-sm-row">
      {React.Children.toArray(children).map((child, i) => (
        <li key={i} className="nav-item">
          {child}
        </li>
      ))}
    </ul>
  );
};

export default { Item, Container };
