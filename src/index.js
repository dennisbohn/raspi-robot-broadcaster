const options = {
  video: {
    width: 960,
    height: 720,
    framerate: 30,
    profile: "baseline",
    bitrate: 4194304,
    timeout: 0,
  },
  server: "http://192.168.1.40:3001/zS7wk6B2pAyRYQw2zJJVemqecoiwP6h8",
};

const VideoBroadcaster = require("./Classes/VideoBroadcaster");
const vb = new VideoBroadcaster(options);
