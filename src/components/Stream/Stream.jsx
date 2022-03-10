import React from "react";
import { useAuth } from "../../hooks";

function getVideoDimension(height = 200, width = 300) {
  return { width, height };
}

const Stream = () => {
  const videoRef = React.useRef(null);
  const auth = useAuth();

  React.useEffect(() => {
    const video = videoRef.current;
    console.log(video);
    navigator.mediaDevices
      .getUserMedia({ video: getVideoDimension(), audio: false })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((message) => console.log(message, "Permission Not Granted For Camera"));
  }, []);

  if (auth.loading) return null;

  return (
    <section className="container p-0">
      <section className="participants p-3 bg-gray-800 mt-3 flex flex-wrap gap-1 justify-center items-center">
        <div className="relative">
          <video className="rounded border-3 border-gray-700" ref={videoRef} autoPlay></video>
          <span
            className="absolute bg-white bg-opacity-5 text-xs p-1 rounded-sm backdrop-filter backdrop-blur-sm"
            style={{ bottom: "0.5rem", right: "1rem" }}
          >
            Harsh Rastogi
          </span>
        </div>
      </section>
    </section>
  );
};

export default Stream;
