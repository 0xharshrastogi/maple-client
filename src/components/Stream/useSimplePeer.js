import React from "react";
import { useHistory, useParams } from "react-router-dom";
import SimplePeer from "simple-peer";
import io from "socket.io-client";
import client from "../../api/server/config";
import { useAuth } from "../../hooks";

const convertStream = async (stream) => {
  const video = stream.getVideoTracks()[0];
  const image = new ImageCapture(video);
  const blob = image.takePhoto();
  return blob;
};

const markAttendence = async (userID, classID, blob) => {
  const data = new FormData();

  data.append("userImage", blob);
  data.append("classID", classID);

  return await client.patch(`/v1/user/${userID}/attendence/mark`, data);
};

export default (handleAttendance) => {
  handleAttendance;
  const { user } = useAuth();
  const { classID } = useParams();
  const history = useHistory();
  const [peers, setPeers] = React.useState([]);
  const videoRef = React.useRef();
  const socketRef = React.useRef(null);
  const [stream, setStream] = React.useState(null);

  React.useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080/video-stream");
    const { current: socket } = socketRef;
    let stream = null;

    navigator.mediaDevices
      .getUserMedia({ video: { height: 200, width: 300 }, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
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

  React.useEffect(() => {
    if (!stream) return;
    convertStream(stream)
      .then((blob) => markAttendence(user.userID, classID, blob))
      .then(() => handleAttendance("Attendence Marked Succesfully", "primary"))
      .catch(() => handleAttendance("Attendence Not Market Succesfully", "danger"));
  }, [classID, stream, user]);

  React.useEffect(() => {
    return () => {
      if (!stream) return;
      stream?.getTracks().forEach((track) => track.stop());
      setPeers([]);
      setStream(null);
      socketRef.current.disconnect();
    };
  }, [stream]);

  const endCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setPeers([]);
    setStream(null);
    socketRef.current.disconnect();
    history.push(`/class/${classID}/feed`);
  };

  const turnOffCamera = () => {
    const videoTracks = stream.getVideoTracks();
    videoTracks.forEach((track) => (track.enabled = false));
  };

  const turnOnCamera = () => {
    const videoTracks = stream.getVideoTracks();
    videoTracks.forEach((track) => (track.enabled = true));
  };

  return { peers, videoRef, endCall, turnOffCamera, turnOnCamera };
};
