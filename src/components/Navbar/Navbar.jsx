/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import brandLogo from '../../assets/img/logo.svg';
import useToolTip from '../../hooks/useToolTip';
import Button from '../Button/Button';
import Portal from '../Portal/Portal';
import ToolTip, { ToolTipWrapper } from '../ToolTip/ToolTip';
import './Navbar.css';

/**
 * Props Of Navbar
 *
 * @typedef {Object} NavbarProps
 *
 * @property {boolean} logo If true renders only the brand logo in navbar
 */

/**
 * Component for Navbar
 *
 * @param {NavbarProps} props
 */

const Navbar = ({ logo }) => {
  const isSignedIn = useSelector((store) => store.isSignedIn);

  // const handleLogOut = useCallback(() => {
  //   const GoogleAuth = gapi.auth2.getAuthInstance();
  //   GoogleAuth.signOut();
  // }, [isSignedIn, history]);

  // const userImageMouseEnterHandler = useCallback(() => {
  //   setTooltipActice(true);
  // }, [setTooltipActice, setTooltipPos]);

  // const userImageMouseLeaveHandler = useCallback(() => {
  //   setTooltipActice(false);
  // }, [setTooltipActice]);

  return (
    <nav className="flex items-center justify-between py-3 px-2 navbar md:px-9">
      <h3 className="flex items-center space-x-2">
        <img src={brandLogo} alt="Logo" className="h-12 sm:h-14" />
        <span className="text-2xl sm:text-4xl text-red-600 font-bold">Mapple</span>
      </h3>
      {/* will render default untill logo is requiredOnly*/}

      {!logo && !isSignedIn && (
        <div className="space-x-3 sm:space-x-10">
          <Button to="/login">Login</Button>
          <Button to="/signup" type="secondary">
            Signup
          </Button>
        </div>
      )}

      {!logo && isSignedIn && <RenderUserJSX />}
    </nav>
  );
};

const RenderUserJSX = () => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [portalActive, setPortalActive] = useState(false);

  const [tooltipActice] = useToolTip(false);

  const user = useSelector(
    ({ user }) =>
      user && { imageURL: user.imageURL, fullname: user.firstname, email: user.email }
  );

  const onClickHandler = (e) => {
    setPortalActive((state) => !state);
    const rect = e.target.getBoundingClientRect();
    const left = rect.x - 320 + rect.width;
    const top = rect.y + rect.height + 16;
    setCoords({ top, left });
  };

  return (
    <div className="space-x-3 sm:space-x-10 flex items-center">
      {/* div for rendering tooltip */}

      <ToolTipWrapper>
        <div
          className="w-11 rounded-full overflow-hidden cursor-pointer user-image-btn"
          // onMouseEnter={() => setTooltipActice(true)}
          // onMouseLeave={() => setTooltipActice(false)}
          onClick={onClickHandler}
        >
          <img src={user.imageURL} alt={`${user.fullname} Profile Picture`} />
        </div>

        {tooltipActice && (
          <ToolTip direction="left">
            <h3 className="mb-4">Mapple Account</h3>

            <p className="font-normal text-sm text-gray-400">{user.fullname}</p>
            <p className="font-normal text-sm text-gray-400">{user.email}</p>

            {/* <Button onClick={handleLogOut}>Logout</Button> */}
          </ToolTip>
        )}

        {portalActive && (
          <Portal>
            <div
              style={{ ...coords }}
              className="absolute w-80 rounded-md shadow-md bg-gray-700 text-white p-4 top-14 left-0"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam
              omnis maiores nihil nam eius non amet! Eveniet rem laborum esse libero odit
              architecto, ipsum incidunt totam, beatae placeat magni?
            </div>
          </Portal>
        )}
      </ToolTipWrapper>
    </div>
  );
};

Navbar.defaultProps = {
  logo: false,
};

Navbar.propTypes = {
  /**
   * If true, then is only renders the logo of navbar
   */
  logo: PropTypes.bool,
};

export default Navbar;
