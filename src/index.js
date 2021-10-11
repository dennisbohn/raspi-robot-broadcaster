const options = {
  video: {
    width: 960,
    height: 540,
    framerate: 30,
    profile: "baseline",
    bitrate: 4194304,
    timeout: 0,
  },
  server: {
    url: "http://192.168.1.40:3001/uturm/broadcaster",
    authToken:
      "eeI0YUjAaLAwss2TbVOtpaZKLOc6abfcgB50ZuwI2WMzIzTC9YzkJrYiIk83R8f1",
  },
};

const VideoBroadcaster = require("./Classes/VideoBroadcaster");
const vb = new VideoBroadcaster(options);
