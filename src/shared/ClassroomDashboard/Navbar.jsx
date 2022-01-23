import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DashboardContext from "./DashboardContext";
import "./style.css";

const IMAGE_URL =
  "https://lh3.googleusercontent.com/ogw/ADea4I6w7H_q-lwYgmK5xrJ0CAKoqUQ17fIVYrBR4i0o9A=s32-c-mo";

const Navbar = (props) => {
  const { data, loading } = useContext(DashboardContext);
  const { basePath } = props;

  if (loading) return <nav className="h-16 border-b-2"></nav>;
  return (
    <nav className="grid md:flex grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 border-b-2 px-4 pt-4 gap-y-6 text-gray-700">
      <div className="row-span-1 justify-self-start self-center overflow-hidden whitespace-nowrap block textoverflow-ellipsis">
        {!loading && (
          <span className="uppercase  whitespace-nowrap overflow-hidden">
            {data.name}
          </span>
        )}
      </div>

      <nav className="row-start-2 col-span-2 flex-1">
        <ul className="flex justify-center scroll_tabbar">
          <li className="border-b-2 border-indigo-700">
            <Link
              className="text-indigo-700 hover:bg-gray-100 cursor-pointer text-sm"
              to={basePath}
            >
              Details
            </Link>
          </li>
          <li className="">
            <Link
              className="py-3 px-4 hover:bg-gray-100 cursor-pointer text-sm"
              to={basePath + "classwork"}
            >
              Classworks
            </Link>
          </li>
          <li>
            <Link
              className="py-3 px-4 hover:bg-gray-100 cursor-pointer text-sm"
              to={basePath + "people"}
            >
              People
            </Link>
          </li>
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
};

export default Navbar;
