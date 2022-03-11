import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import useSocket from "../../hooks/useSocket";

function getVideoDimension(height = 200, width = 300) {
  return { width, height };
}

const Stream = () => {
  const [userStream, setUserStream] = useState({ loading: true, stream: null, permission: false });
  const { socket } = useSocket("http://localhost:8080/video-stream");
  const videoRef = React.useRef(null);
  const auth = useAuth();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Connected Succefully");
    });

    return () => {
      socket.disconnect();
      // console.log(socket);
    };
  }, [socket]);

  React.useEffect(() => {
    console.count("Get User Stream");
    const video = videoRef.current;

    const getUserMediaAcess = () => {
      navigator.mediaDevices
        .getUserMedia({ video: getVideoDimension(), audio: false })
        .then((stream) => {
          video.srcObject = stream;
          setUserStream({ loading: false, stream, permission: true });
        })
        .catch((message) => {
          setUserStream({ loading: false, stream: null, permission: false });
          console.warn(message);
        });
    };

    if (userStream.loading && !userStream.stream) {
      getUserMediaAcess();
    }

    return (
      userStream.stream &&
      userStream.permission &&
      (() => {
        userStream.stream.getTracks().forEach((track) => track.stop());
      })
    );
  }, [userStream]);

  return (
    <section className="container p-0">
      <section className="participants p-3 bg-gray-800 mt-3 flex flex-wrap gap-1 justify-center items-center">
        <div className="relative">
          <video className="rounded border-3 border-gray-700" ref={videoRef} autoPlay></video>
          <span
            className="absolute bg-white bg-opacity-5 text-xs p-1 rounded-sm backdrop-filter backdrop-blur-sm"
            style={{ bottom: "0.5rem", right: "1rem" }}
          >
            {userStream.loading
              ? "Checking Webcam Access"
              : userStream.permission
              ? auth.user.firstname
              : "Permission for accessing webcam failed"}
          </span>
        </div>
      </section>
    </section>
  );
};

export default Stream;
