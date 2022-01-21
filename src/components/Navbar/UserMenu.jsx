import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import useToolTip from "../../hooks/useToolTip";
import Button from "../Button/Button";
import Model from "../Model/Model";
import ToolTip, { ToolTipWrapper } from "../ToolTip/ToolTip";
import RenderUserModel from "./RenderUserModel";

const RenderUserJSX = ({ email, fullname, imageSRC }) => {
  const [portalActive, setPortalActive] = useState(false);
  const largerDisplay = useMediaQuery("(min-width: 640px)", true, false);

  const [tooltipActice, setTooltipActice] = useToolTip(false);

  const handleLogOut = useCallback(() => {
    // eslint-disable-next-line no-undef
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut();
  }, []);

  const handelModalToogle = useCallback(() => {
    setPortalActive((state) => !state);
  }, [setPortalActive]);

  // if (!user) return <Spinner />;

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
          <img src={imageSRC} alt={`${fullname} Profile Picture`} />
        </div>

        {tooltipActice && (
          <ToolTip direction="left">
            <h3>Mapple Account</h3>
            <p>{email}</p>
            <p>{fullname}</p>
          </ToolTip>
        )}

        {portalActive && (
          <Model onClose={handelModalToogle} modelStyleClasses="p-8 shadow-md">
            <RenderUserModel email={email} fullname={fullname} imageSRC={imageSRC} />
            <br />
            <div className="space-y-5 mt-7">
              <Button
                to="/manage/myclassrooms"
                type="secondary"
                onClick={handelModalToogle}
                full
              >
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

RenderUserJSX.propTypes = {
  email: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired,
  imageSRC: PropTypes.string.isRequired,
};

export default RenderUserJSX;
