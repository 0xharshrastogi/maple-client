import PropTypes from "prop-types";
import React from "react";

const RenderUserModel = ({ email, fullname, imageSRC }) => {
  return (
    <div className="user-modal">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 rounded-full overflow-hidden">
          <img className="w-14" src={imageSRC} alt={fullname} />
        </div>
        <h3 className="font-semibold text-lg">{fullname}</h3>
        <h3>{email}</h3>
      </div>
    </div>
  );
};

RenderUserModel.propTypes = {
  email: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  imageSRC: PropTypes.string.isRequired,
};
export default RenderUserModel;
