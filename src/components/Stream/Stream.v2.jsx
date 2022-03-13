/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks";

const uri = "http://localhost:8080/video-stream";

class Connection {
  constructor(config) {
    this.auth = config.auth;
    this.classData = config.classData;
    this.stream = null;
    this.streamActive = false;
    this.uri = config.socketUri || uri;
    this.streamConfigiration = { video: true, audio: false };
    this.adminPeer = null;
    this.connectedPeer = [];

    this.socket = this.setupNewSocket(this.uri);

    this.setupSocketListeners(this.socket);
    // this.setupSocketEvents(this.socket);
  }

  get isStreaming() {
    return this.streamActive;
  }

  get isSocketConnected() {
    if (!this.socket) throw new Error("Socket Instance Not Found");

    return this.socket.active;
  }

  get userType() {
    const userID = this.auth.user.userID;
    const adminUserId = this.classData.admin.userID;
    return userID === adminUserId ? "admin" : "participant";
  }

  setupNewSocket(uri) {
    if (!uri) throw new Error("Socket Url Not Passed");

    const socket = io(uri);
    return socket;
  }

  /**
   * @param {import("socket.io-client").Socket} socket
   */
  setupSocketListeners(socket) {
    console.info("Setting Up Socket Listeners");

    socket.on("connect", async () => {
      console.log("Socket Connected To Server");

      console.log("Event Fired", "Join Class");
      socket.emit("join class", { classID: this.classData.classID, userID: this.auth.user.userID });
    });

    socket.on("disconnected", (reason) => {
      console.log("Disconneted to server for reason", reason);
    });

    socket.on("client log", (message) => console.log("Message from server:", message));
  }

  /**
   *
   * @param {import("simple-peer").Instance} peer
   */
  setupPeerListeners(peer) {
    peer;
    // peer.on("connect", () => {
    //   console.log("New Peer Connected");
    // });
  }

  async startStream() {
    if (this.isStreaming) return;

    this.stream = await this.setupVideoAudioStream();
    this.streamActive = true;
    console.log("Media Stream Started");
    return this.stream;
  }

  closeStream() {
    if (!this.isStreaming) return;

    for (const track of this.stream.getTracks()) {
      track.stop();
    }

    this.streamActive = false;
    this.stream = null;
    console.log("Media Stream Closed");
  }

  setupVideoAudioStream() {
    return navigator.mediaDevices.getUserMedia(this.streamConfigiration);
  }
}
// App

const Stream = ({ classData }) => {
  const auth = useAuth();
  const userVideo = useRef();

  const connection = React.useMemo(() => {
    if (classData.loading) return null;

    console.count("Create New Connection");
    return new Connection({ classData: classData.data, auth });
  }, [classData, auth]);

  React.useEffect(() => {
    if (!connection) return;

    const video = userVideo.current;
    connection.startStream().then((stream) => (video.srcObject = stream));
    return () => {
      console.log("Connection Closed");
      connection.closeStream();
    };
  }, [connection]);

  window.classroomInfoServer = () =>
    connection.socket.emit("ClassroomInfo", { classID: classData.data.classID });
  window.showCon = () => console.log(connection);
  window.startCon = () => connection.startStream();
  window.closeCon = () => connection.closeStream();

  return (
    <div>
      <video ref={userVideo} autoPlay muted controls />
    </div>
  );
};

export default Stream;
