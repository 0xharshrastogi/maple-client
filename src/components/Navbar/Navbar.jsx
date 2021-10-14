/* eslint-disable no-undef */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import brandLogo from '../../assets/img/logo.svg';
import useToolTip from '../../hooks/useToolTip';
import Button from '../Button/Button';
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
  const [tooltipActice, setTooltipActice] = useToolTip(false);
  const isSignedIn = useSelector((store) => store.isSignedIn);
  const user = useSelector((store) => ({
    imageURL: store.user.imageURL,
    fullname: store.user.firstname,
    email: store.user.email,
  }));

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

      {!logo && isSignedIn && (
        <div className="space-x-3 sm:space-x-10 flex items-center">
          {/* div for rendering tooltip */}
          <ToolTipWrapper>
            <div
              className="w-11 rounded-full overflow-hidden cursor-pointer user-image-btn"
              onMouseEnter={() => setTooltipActice(true)}
              onMouseLeave={() => setTooltipActice(false)}
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
          </ToolTipWrapper>
        </div>
      )}
    </nav>
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
