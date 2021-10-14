import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const element = document.createElement('div');
  const mount = document.getElementById('portal');

  useEffect(() => {
    mount.appendChild(element);
    return () => mount.removeChild(element);
  }, [mount, element]);

  return createPortal(children, element);
};

Portal.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Portal;
