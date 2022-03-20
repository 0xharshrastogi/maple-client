/* eslint-disable react/prop-types */
import React from "react";
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

const Stream = ({ classData }) => {
  const { peers, videoRef, endCall, turnOffVideo } = useSimplePeer(classData);
  console.log("Already In Stream", peers);

  return (
    <>
      <div
        className={`mt-3 bg-gray-800 flex flex-wrap gap-4 p-2 ${
          peers.length >= 3 ? "justify-around" : ""
        }`}
      >
        <img id="test" />
        <div>
          <video className="rounded h-16 md:h-40" ref={videoRef} autoPlay muted />
        </div>
        {peers.map(({ peerID, peer }) => (
          <div key={peerID}>
            <Video peer={peer} />
          </div>
        ))}
      </div>

      <ToolPanal top="90%" left="50%" onEndCall={endCall} onTurnOffVideo={turnOffVideo} />
    </>
  );
};

export default Stream;
