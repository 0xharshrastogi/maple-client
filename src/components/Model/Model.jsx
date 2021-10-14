import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

const Model = ({ overlayStyles, modelStyles, children }) => {
  return createPortal(
    <>
      <div className={overlayStyles || ''}></div>
      <section className={modelStyles || ''}>{children}</section>
    </>,
    document.getElementById('portal')
  );
};

// className="absolute w-80 rounded-md shadow-md bg-gray-700 text-white p-4 top-14 left-0"
Model.propTypes = {
  overlayStyles: PropTypes.string,
  modelStyles: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Model;
