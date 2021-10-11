const VideoCamera = require("./VideoCamera.js");
const io = require("socket.io-client");

class VideoBroadcaster {
  constructor(options) {
    this.options = options;
    this.sendChunk = this.sendChunk.bind(this);
    this.sendStartChunks = this.sendStartChunks.bind(this);
    this.onConnect = this.onConnect.bind(this);

    // Start video camera
    this.videoCamera = new VideoCamera(options.video);

    // Connect to websocket
    this.socket = io(options.server.url);

    // Send start chunks in case of reconnection
    console.log('Connect to "' + options.server.url);
    this.socket.on("connect", this.onConnect);

    // Send chunks
    this.videoCamera.on("chunk", this.sendChunk);
  }

  // Send chunk if socket is connected
  sendChunk(chunk) {
    if (this.socket.connected) {
      this.socket.emit("chunk", chunk);
    }
  }

  // Send start chunks in case of reconnection
  sendStartChunks() {
    this.videoCamera.startChunks.forEach((chunk) => {
      this.sendChunk(chunk);
    });
  }

  // On connection
  onConnect() {
    this.sendStartChunks();
  }
}

module.exports = VideoBroadcaster;
