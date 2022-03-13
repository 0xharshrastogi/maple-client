import Peer from "peerjs";
import openSocket from "socket.io-client";

// const setting = {
//   roomID:aklsjd,
//   peerID:dkalsjd;
// }

const PeerStore = new Map();

const videoConfig = {
  frameRate: 12,
  noiseSuppression: true,
  width: { min: 640, ideal: 1280, max: 1920 },
  height: { min: 480, ideal: 720, max: 1080 },
};

export default function createNewSocketInstance(config) {
  return new SocketConnection(config);
}

class SocketConnection {
  constructor(settings) {
    this.settings = settings;
    this.isPeerConnected = false;
    this.isSocketConnnected = false;
    this.peerID = null;
    this.streamActive = false;

    this.peerConn = this.setupNewPeerConnection();
    if (this.peerConn) this.isPeerConnected = true;

    this.socket = this.setupSocketConnection();
    if (this.socket) this.isSocketConnnected = true;

    this.setupPeerEvents();
  }

  setupNewPeerConnection() {
    return new Peer("", { host: "/", port: 3001, secure: true });
  }

  setupSocketConnection() {
    const socket = openSocket.connect("http://localhost:8080/video-stream", {
      secure: true,
      reconnection: true,
      rejectUnauthorized: false,
      reconnectionAttempts: 10,
    });

    return socket;
  }

  setupPeerEvents() {
    this.peerConn.on("close", (peerID) => {
      this.peerID = peerID;
      const { roomID, userID } = this.settings;

      this.socket.emit("join-room", { roomID, userID });
      this.setNavigatorToStream();
    });

    this.myPeer.on("error", (err) => {
      console.log("peer connection error", err);
      this.myPeer.reconnect();
    });
  }

  getVideoAudioStream(video = true, audio = true) {
    if (!navigator.mediaDevices?.getUserMedia) return;

    return navigator.mediaDevices.getUserMedia({ video: video ? videoConfig : false, audio });
  }

  async setNavigatorToStream() {
    const stream = await this.getVideoAudioStream(true, true);

    if (!stream) return;

    this.streamActive = true;
    this.settings.updateInstance("streamActive", true);
    // this.createVideo({ id: this.myID, stream }); !TODO
    this.setupPeerListeners(stream);
    this.setupNewUserConnection(stream);
  }

  setupPeerListeners(stream) {
    this.peerConn.on("call", (mediaConnection) => {
      mediaConnection.answer(stream);

      mediaConnection.on("stream", (userVideoStream) => {
        this.createVideo({ id: mediaConnection.metadata.id, stream: userVideoStream });
      });

      mediaConnection.on("close", () => {
        console.log("closing peers listeners", mediaConnection.metadata.id);
        this.removeVideo(mediaConnection.metadata.id);
      });

      mediaConnection.on("error", () => {
        console.log("peer error ------");
        this.removeVideo(mediaConnection.metadata.id);
      });

      PeerStore.set(mediaConnection.metadata.id, mediaConnection);
    });
  }

  setupNewUserConnection(stream) {
    this.socket.on("new-user-connect", (userData) => {
      console.log("New User Connected", userData);
      this.connectToNewUser(userData, stream);
    });
  }
}
