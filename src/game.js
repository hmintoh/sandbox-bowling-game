const Frame = require("./frame");

class Game {
  constructor() {
    this.frames = [];
    this.currentFrame = null;
    this.frameIndex = 1;
  }

  roll(pin) {
    if (this.currentFrame === null) {
      const frame = new Frame(this.frameIndex++);
      this.frames.push(frame);
      this.currentFrame = frame;
    }

    this.currentFrame.roll(pin);

    if (this.currentFrame.isComplete() && !this.currentFrame.isLastFrame()) {
      const frame = new Frame(this.frameIndex++);
      this.currentFrame.setNextFrame(frame);
      this.frames.push(frame);
      this.currentFrame = frame;
    }
  }

  gameScore() {
    return this.frames.map(frame => frame.frameScore()).reduce((a, b) => a + b);
  }
}

module.exports = Game;
