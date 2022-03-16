import React from "react";
import { useParams } from "react-router-dom";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

export default () => {
  const { classID } = useParams();
  const [peers, setPeers] = React.useState([]);
  const videoRef = React.useRef();
  const socketRef = React.useRef(null);

  // console.log({ classID, peers, videoRef, socketRef: socket, classData });

  React.useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080/video-stream");
    const { current: socket } = socketRef;
    let stream = null;

    navigator.mediaDevices
      .getUserMedia({ video: { height: 200, width: 300 }, audio: true })
      .then((mediaStream) => {
        console.log("My Socket ID", socket.id);

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

  return { peers, videoRef };
};
