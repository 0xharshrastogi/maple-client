import PropTypes from 'prop-types';
import React from 'react';

const Logo = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

const ListItem = ({ icon: Icon, children }) => {
  console.log(Icon);
  return (
    <li className="flex items-center gap-3">
      {Icon && (
        <Logo className="bg-red-600 h-8 w-8 rounded-full p-2 text-xl center self-start">
          {Icon}
        </Logo>
      )}

      {null}

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
