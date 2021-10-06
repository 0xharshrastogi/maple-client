import PropTypes from 'prop-types';
import React from 'react';
import './card.css';

// ?Icon Logo Component
const Logo = ({ children, className }) => {
  return <span className={className}>{children}</span>;
};

// ?Cards Component
const Cards = ({ title, children, logo: Icon }) => {
  return (
    <div className="text-gray-600 p-8 space-y-2 text-center shadow-lg rounded-md relative card">
      {Icon && (
        <Logo className="bg-red-600 h-14 w-14 absolute p-3 rounded-full center card-logo text-2xl">
          {Icon}
        </Logo>
      )}

      <h4 className="font-bold text-red-600 text-lg md:text-xl">{title}</h4>

      <p className="">{children}</p>
    </div>
  );
};

Logo.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
};

Cards.propTypes = {
  logo: PropTypes.element,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Cards;
