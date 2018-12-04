class Frame {
  constructor() {
    this.rolls = [];
  }

  roll(pin) {
    this.rolls.push(pin);
  }

  isComplete() {
    if (!this.isLastFrame()) {
      if (this.rolls.length === 0) {
        return false;
      } else if (!this.isStrike() && this.rolls.length === 1) {
        return false;
      } else {
        return true;
      }
    } else {
      if ((!this.isSpare() || !this.isStrike()) && this.rolls.length === 1) {
        return false;
      } else {
        return true;
      }
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
}

module.exports = Frame;
