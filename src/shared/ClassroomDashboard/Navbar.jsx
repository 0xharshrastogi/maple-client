import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardContext from "./DashboardContext";
import "./style.css";
const IMAGE_URL =
  "https://lh3.googleusercontent.com/ogw/ADea4I6w7H_q-lwYgmK5xrJ0CAKoqUQ17fIVYrBR4i0o9A=s32-c-mo";

const Navbar = (props) => {
  const { data, loading } = useContext(DashboardContext);
  const location = useLocation();

  if (loading) return <nav className="h-32 md:h-16 border-b-2"></nav>;

  const { list: links } = props;

  return (
    <nav className="grid md:flex grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 border-b-2 px-4 pt-4 gap-y-6 text-gray-700">
      <div className="row-span-1 justify-self-start self-center overflow-hidden whitespace-nowrap block textoverflow-ellipsis">
        {!loading && (
          <span className="uppercase  whitespace-nowrap overflow-hidden">
            {data.name}
          </span>
        )}
      </div>

      <nav className="row-start-2 col-span-2 self-end md:flex-1">
        <ul className="flex justify-center space-x-1 scroll_tabbar">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <li
                key={link.key}
                className={`hover:bg-gray-100 relative ${
                  active ? "border-indigo-700 hover:bg-indigo-100 border-b-2" : ""
                }`}
              >
                <Link
                  className={`py-3 px-3 sm:px-6 inline-block cursor-pointer text-sm ${
                    active ? "text-indigo-700" : ""
                  }`}
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="place-self-center justify-self-end">
        <div className="rounded-full overflow-hidden">
          <img src={IMAGE_URL} alt={""} />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  basePath: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default Navbar;
