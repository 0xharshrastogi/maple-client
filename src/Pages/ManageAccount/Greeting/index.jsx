import PropTypes from "prop-types";
import React from "react";

export const Greeting = ({ name, messgage }) => {
  return (
    <div
      className="mx-4 my-4 py-9 px-4 bg-cover bg-no-repeat shadow-sm bg-center border-2 border-gray-500 border-opacity-5"
      style={{
        backgroundImage: `url(https://onecognizant.cognizant.com/Home/926/images/welcomeNote_Evening.png)`,
      }}
    >
      <p className="text-blue-800 font-medium">Good Evening, {name}</p>
      <p className="text-gray-900 font-light">{messgage}</p>
    </div>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  messgage: PropTypes.string.isRequired,
};
