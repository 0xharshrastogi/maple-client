import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import useToolTip from '../../hooks/useToolTip';
import Button from '../Button/Button';
import Model from '../Model/Model';
import Spinner from '../Spinner/Spinner';
import ToolTip, { ToolTipWrapper } from '../ToolTip/ToolTip';
import RenderUserModel from './RenderUserModel';

const RenderUserJSX = () => {
  const [portalActive, setPortalActive] = useState(false);
  const largerDisplay = useMediaQuery('(min-width: 640px)', true, false);

  const [tooltipActice, setTooltipActice] = useToolTip(false);

  const user = useSelector(({ user }) => {
    return (
      user && {
        imageURL: user.imageURL,
        fullname: user.firstname,
        email: user.email,
      }
    );
  });

  const handleLogOut = useCallback(() => {
    // eslint-disable-next-line no-undef
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  }, []);

  const handelModalToogle = useCallback(() => {
    setPortalActive((state) => !state);
  }, [setPortalActive]);

  if (!user) return <Spinner />;

  return (
    <div className="space-x-3 sm:space-x-10 flex items-center">
      {/* div for rendering tooltip */}
      <ToolTipWrapper>
        <div
          className="w-11 rounded-full overflow-hidden cursor-pointer user-image-btn"
          onMouseEnter={largerDisplay ? () => setTooltipActice(true) : undefined}
          onMouseLeave={largerDisplay ? () => setTooltipActice(false) : undefined}
          onClick={handelModalToogle}
        >
          <img src={user.imageURL} alt={`${user.fullname} Profile Picture`} />
        </div>

        {tooltipActice && (
          <ToolTip direction="left">
            <h3>Mapple Account</h3>
            <p>{user.email}</p>
            <p>{user.fullname}</p>
          </ToolTip>
        )}

        {portalActive && (
          <Model onClose={handelModalToogle} modelStyleClasses="p-8 shadow-md">
            <RenderUserModel user={user} />
            <br />
            <div className="space-y-5 mt-7">
              <Button to="/manage" type="secondary" onClick={handelModalToogle} full>
                Manage Your Account
              </Button>
              <Button full onClick={handleLogOut}>
                Logout
              </Button>
            </div>
          </Model>
        )}
      </ToolTipWrapper>
    </div>
  );
};

export default RenderUserJSX;
