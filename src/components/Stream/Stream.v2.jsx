/* eslint-disable react/prop-types */
import React from "react";
import Toast, { useToast } from "../Toast/Toast";
import ToolPanal from "./ToolPanal";
import useSimplePeer from "./useSimplePeer";

const Video = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log(stream);
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <video className="rounded h-16 md:h-40" autoPlay muted ref={ref} />;
};

const Stream = () => {
  const normalToast = useToast(2500);
  const dangerToast = useToast(2500);
  const handleAttendanceToast = (message, type) => {
    console.log(message, type);
    if (type === "danger") dangerToast.show(message);
    else normalToast.show(message);
  };
  const { peers, videoRef, endCall, turnOffCamera, turnOnCamera } =
    useSimplePeer(handleAttendanceToast);
  const [cameraEnabled, setCameraEnabled] = React.useState(true);
  return (
    <>
      <div
        className={`mt-3 bg-gray-800 flex flex-wrap gap-4 p-2 ${
          peers.length >= 3 ? "justify-around" : ""
        }`}
      >
        <img id="test" />
        <div>
          <video className="rounded h-16 sm:h-28 md:h-40" ref={videoRef} autoPlay muted />
        </div>
        {peers.map(({ peerID, peer }) => (
          <div key={peerID}>
            <Video peer={peer} />
          </div>
        ))}
      </div>

      <ToolPanal
        top="90%"
        left="50%"
        onEndCall={endCall}
        onTurnOffVideo={() => {
          setCameraEnabled(false);
          turnOffCamera();
        }}
        onTurnOnCamera={() => {
          setCameraEnabled(true);
          turnOnCamera();
        }}
        cameraEnabled={cameraEnabled}
      />

      <Toast ref={normalToast.ref} varient="primary" active={normalToast.isActive} />
      <Toast ref={dangerToast.ref} varient="danger" active={dangerToast.isActive} />
    </>
  );
};

export default Stream;
