/* eslint-disable react/prop-types */
import { faVideoCamera, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ToolPanal = (props) => {
  const { top, left, onEndCall, onTurnOffVideo, onTurnOnCamera } = props;
  const { cameraEnabled } = props;
  return (
    <div
      className="fixed bg-white shadow-md -translate-x-2/4 transform -translate-y-2/4"
      style={{ top, left }}
    >
      <ul className="d-flex gap-1">
        <li className="center">
          {cameraEnabled ? (
            <button
              className="p-2 cursor-pointer flex items-center justify-center"
              onClick={onTurnOffVideo}
            >
              <FontAwesomeIcon icon={faVideoSlash} />
            </button>
          ) : (
            <button
              className="p-2 cursor-pointer flex items-center justify-center"
              onClick={onTurnOnCamera}
            >
              <FontAwesomeIcon icon={faVideoCamera} />
            </button>
          )}
        </li>
        <li>
          <button className="p-2 text-light bg-danger cursor-pointer" onClick={onEndCall}>
            End Call
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ToolPanal;
