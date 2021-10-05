import PropTypes from 'prop-types';
import React from 'react';
import './card.css';

const Cards = ({ title, children }) => {
  return (
    <div className="text-gray-600 p-8 space-y-2 text-center shadow-lg rounded-md card">
      <h4 className="font-bold text-red-600 text-lg">{title}</h4>
      <p className="">{children}</p>
    </div>
  );
};

Cards.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Cards;
