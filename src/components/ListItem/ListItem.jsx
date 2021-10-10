import PropTypes from 'prop-types';
import React from 'react';

const Logo = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

const ListItem = ({ icon: Icon, children }) => {
  return (
    <li className="flex items-center gap-3 text-gray-500 font-medium text-lg">
      {Icon && (
        <Logo className="bg-red-600 h-8 w-8 rounded-full p-2 text-xl center self-start shadow-sm">
          {Icon}
        </Logo>
      )}

      {Icon ? <p>{children}</p> : children}
    </li>
  );
};

Logo.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};

ListItem.propTypes = {
  icon: PropTypes.object,
  children: PropTypes.any.isRequired,
};

export default ListItem;
