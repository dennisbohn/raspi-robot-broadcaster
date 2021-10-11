const Raspivid = require("raspivid");
const Splitter = require("stream-split");
const Stream = require("stream");
const EventEmitter = require("events");
const NALseparator = Buffer.from([0, 0, 0, 1]);

class VideoCamera extends EventEmitter {
  constructor(options) {
    // Super constructor
    super();

    // Array for the first chunks
    this.startChunks = [];

    // Start the camera
    this.start(options);
  }

  // Start the camera
  start(options) {
    const self = this;
    Raspivid(options)
      .pipe(new Splitter(NALseparator))
      .pipe(
        new Stream.Transform({
          transform: function (chunk, encoding, callback) {
            // Get chunk type
            const chunkType = chunk[0] & 0b11111;

            // Write SPS and PPS frames to startChunks
            if (chunkType === 7) self.startChunks[0] = chunk;
            if (chunkType === 8) self.startChunks[1] = chunk;

            // Chunk event
            self.emit("chunk", chunk);

            callback();
          },
        })
      );
  }
}

module.exports = VideoCamera;
