import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import DashboardContext from "../DashboardContext";
import { Config } from "../useConfig";

const DetailScreen = () => {
  const { loading, data } = useContext(DashboardContext);
  const [config, dispatch] = useContext(Config);

  const { detailJumboTronOpened } = config;

  if (loading) return "Loading...";

  const { id: classCode, name, instructor } = data;
  const handleJumbo = () => {
    const type = !detailJumboTronOpened
      ? "DETAIL_SCREEN_JUMBO_OPEN"
      : "DETAIL_SCREEN_JUMBO_CLOSE";

    dispatch({ type });
  };

  return (
    <section className="px-2 md:container mx-auto py-2">
      <article className="rounded-lg overflow-hidden shadow mt-6">
        <div className="bg-gradient-to-tr from-indigo-700 to-indigo-600 p-3 text-white">
          <p className="mt-20 text-2xl flex justify-between items-center ">
            <span>{name}</span>
            <button
              title="View Info"
              className="text-center h-10 w-10 flex items-center justify-between hover:bg-gray-50 rounded-full hover:bg-opacity-5"
              onClick={handleJumbo}
            >
              <FontAwesomeIcon
                className="flex-1"
                icon={detailJumboTronOpened ? faAngleDown : faAngleUp}
              />
            </button>
          </p>
        </div>

        {/* {tabOpened && ( */}
        <div
          className={`p-3 sm:px-6  text-sm text-gray-700 transform ${
            detailJumboTronOpened ? "scale-y-100" : "scale-y-0 hidden"
          } transition-transform duration-100 origin-top ease-in-out`}
        >
          <p>
            <strong>Class Code</strong> {classCode}
          </p>
          <p>
            <strong>Name</strong> {name}
          </p>
          <p>
            <strong>Instructor</strong> {instructor.name.first} {instructor.name.last}
          </p>
        </div>
        {/* )} */}
      </article>
    </section>
  );
};

export default DetailScreen;
