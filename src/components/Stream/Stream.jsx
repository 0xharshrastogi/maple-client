import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchClassroomData } from "../../api/server/classroom";
import { useAuth } from "../../hooks";
import useSocket from "../../hooks/useSocket";
import Spinner from "../Spinner/Spinner";

function getVideoDimension(height = 200, width = 300) {
  return { width, height };
}

const Stream = () => {
  const [isAdmin, setIsAdmin] = useState({ loading: true, value: null });
  const [userStream, setUserStream] = useState({ loading: true, stream: null, permission: false });
  const { socket } = useSocket("http://localhost:8080/video-stream");
  const videoRef = React.useRef(null);
  const { classID } = useParams();
  const auth = useAuth();

  useEffect(() => {
    const classData = () => fetchClassroomData({ classID });

    classData().then((classData) => {
      return setIsAdmin({ loading: false, value: classData.admin.UserID === auth.user.userID });
    });

    socket.on("connect", () => {
      socket.emit("join.classroom", { classID, userID: auth.user.userID });
    });

    socket.on("NewUserConnected", (userID) => {
      console.log("New User Connected", userID);
    });

    return () => {};
  }, [socket, auth, classID]);

  React.useEffect(() => {
    // console.count("Get User Stream");
    // if (isAdmin.loading || !isAdmin.value) return;
    console.log("Feting video permission");
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
  }, [userStream, socket, isAdmin]);

  if (isAdmin.loading) {
    return <Spinner />;
  }

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
        <button
          onClick={() => {
            if (userStream.stream) userStream.stream.getTracks().forEach((track) => track.stop());
          }}
        >
          TurnOff Camera
        </button>
      </section>
    </section>
  );
};

export default Stream;
