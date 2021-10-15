import PropTypes from 'prop-types';
import React from 'react';

const RenderUserModel = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-modal">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 rounded-full overflow-hidden">
          <img className="w-14" src={user.imageURL} alt={user.fullname} />
        </div>
        <h3 className="font-semibold text-lg">{user.fullname}</h3>
        <h3>{user.email}</h3>
      </div>
    </div>
  );
};

RenderUserModel.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RenderUserModel;
