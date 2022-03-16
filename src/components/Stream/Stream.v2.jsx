/* eslint-disable react/prop-types */
import React from "react";
import useSimplePeer from "./useSimplePeer";

const Video = (props) => {
  const ref = React.useRef();

  React.useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log(stream);
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <video autoPlay controls muted ref={ref} />;
};

const Stream = ({ classData }) => {
  const { peers, videoRef } = useSimplePeer(classData);
  console.log("Already In Stream", peers);

  return (
    <div className="mt-3 bg-gray-800 grid-cols-6">
      <video ref={videoRef} autoPlay muted controls />
      {peers.map(({ peerID, peer }) => (
        <Video key={peerID} peer={peer} />
      ))}
    </div>
  );
};

export default Stream;
