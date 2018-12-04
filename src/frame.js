class Frame {
  constructor() {
    this.rolls = [];
  }

  roll(pin) {
    this.rolls.push(pin);
  }

  isComplete() {
    if (this.isLastFrame()) {
      if (this.isStrike() || this.isSpare()) {
        return this.rolls.length === 3;
      } else {
        return this.rolls.length === 2;
      }
    } else {
      if (this.isStrike()) return this.rolls.length === 1;
      return this.rolls.length === 2;
    }
  }

  isStrike() {
    return this.rolls[0] === 10;
  }

  isSpare() {
    return this.rolls[0] + this.rolls[1] === 10;
  }

  isLastFrame() {
    return this.nextFrame === undefined;
  }

  setNextFrame(frame) {
    this.nextFrame = frame;
  }

  frameScore() {
    if (!this.isComplete()) {
      throw new Error("incomplete frame");
    }

    if (this.isSpare() && !this.isLastFrame()) {
      return 10 + this.nextFrame.rolls[0];
    } else if (this.isStrike() && !this.isLastFrame()) {
      return (
        10 +
        this.nextFrame.rolls[0] +
        this.nextFrame.rolls[1] +
        this.nextFrame.rolls[0] +
        this.nextFrame.rolls[1]
      );
    } else {
      return this.rolls.reduce((a, b) => a + b);
    }
  }
}

module.exports = Frame;
