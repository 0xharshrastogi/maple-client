/* eslint-disable react/prop-types */
import React from "react";

const ToolPanal = ({ top, left, onEndCall, onTurnOffVideo }) => {
  console.log(onEndCall);
  return (
    <div
      className="fixed bg-white border shadow-md -translate-x-2/4 transform -translate-y-2/4 px-2"
      style={{ top, left }}
    >
      <ul className="d-flex gap-1">
        <li>
          <button className="p-2 cursor-pointer" onClick={onTurnOffVideo}>
            Close Camera
          </button>
        </li>
        <li>
          <button className="p-2 text-danger cursor-pointer" onClick={onEndCall}>
            End Call
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ToolPanal;
