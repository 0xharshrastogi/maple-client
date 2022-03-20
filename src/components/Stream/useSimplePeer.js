import React from "react";
import { useHistory, useParams } from "react-router-dom";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

export default () => {
  const { classID } = useParams();
  const history = useHistory();
  const [peers, setPeers] = React.useState([]);
  const videoRef = React.useRef();
  const socketRef = React.useRef(null);
  const [stream, setStream] = React.useState(null);

  // console.log({ classID, peers, videoRef, socketRef: socket, classData });

  React.useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080/video-stream");
    const { current: socket } = socketRef;
    let stream = null;

    navigator.mediaDevices
      .getUserMedia({ video: { height: 200, width: 300 }, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        // console.log(new ImageCapture(mediaStream.getTracks()[0]));
        // const imagecapture = new ImageCapture(mediaStream.getVideoTracks()[0]);
        // imagecapture.takePhoto().then(async (blob) => {
        //   // const bytes = await blob.arrayBuffer();
        //   const what = URL.createObjectURL(blob);
        //   console.log(what);
        //   document.getElementById("test").src = URL.createObjectURL(blob);
        // });

        videoRef.current.srcObject = mediaStream;
        socket.emit("join classroom", { classID });
        stream = mediaStream;
      });

    socket.on("message", (message) =>
      console.log("%cMessage From Server:", "color: green", message)
    );

    socket.on("users in room", (participants) => {
      const peers = [];
      for (const participant of participants) {
        const peer = new SimplePeer({ initiator: true, trickle: false, stream });

        peer.on("signal", (data) => {
          socket.emit("provide signal", { to: participant.ID, from: socket.id, data });
        });

        peers.push({ peerID: participant.ID, peer });
      }
      setPeers(peers);
    });

    socket.on("incoming signal", ({ from, data }) => {
      const peer = new SimplePeer({ initiator: false, trickle: false, stream });

      peer.on("signal", (data) => {
        socket.emit("accepting signal", { to: from, data });
      });

      peer.signal(data);
      setPeers((peers) => [...peers, { peerID: from, peer }]);
    });

    socket.on("user disconnected", ({ ID }) => {
      setPeers((peers) => peers.filter(({ peerID }) => peerID !== ID));
    });

    return () => {
      socket.disconnect();
    };
  }, [classID]);

  React.useEffect(() => {
    const { current: socket } = socketRef;

    const handler = ({ from, data }) => {
      for (const { peerID, peer } of peers) {
        if (peerID === from) {
          peer.signal(data);
          return;
        }
      }
    };

    socket.on("signal accepted", handler);

    return () => {
      socket.removeListener("signal accepted", handler);
    };
  }, [peers]);

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setPeers([]);
    setStream(null);
    socketRef.current.disconnect();
    history.push(`/class/${classID}/feed`);
  };

  return { peers, videoRef, endCall };
};
