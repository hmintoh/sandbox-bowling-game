class Frame {
  constructor(index) {
    this.rolls = [];
    this.frameIndex = index;
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
      if (this.isStrike()) {
        return this.rolls.length === 1;
      } else {
        return this.rolls.length === 2;
      }
    }
  }

  isStrike() {
    return this.rolls[0] === 10;
  }

  isStrikeFrame() {
    return this.rolls[0] === 10 && this.rolls.length === 1;
  }

  isSpare() {
    return this.rolls[0] + this.rolls[1] === 10;
  }

  isLastFrame() {
    return this.frameIndex === 10;
  }

  setNextFrame(frame) {
    this.nextFrame = frame;
  }

  spareBonus() {
    return this.nextFrame.rolls[0];
  }

  strikeBonus() {
    if (this.nextFrame.isStrikeFrame()) {
      return this.nextFrame.rolls[0] + this.nextFrame.nextFrame.rolls[0];
    } else {
      return this.nextFrame.rolls[0] + this.nextFrame.rolls[1];
    }
  }

  rollScore() {
    return this.rolls.reduce((a, b) => a + b);
  }

  frameScore() {
    if (!this.isComplete()) throw new Error("incomplete frame");

    if (this.isSpare() && !this.isLastFrame()) {
      return this.rollScore() + this.spareBonus();
    }
    if (this.isStrikeFrame()) {
      return this.rollScore() + this.strikeBonus();
    }
    return this.rollScore();
  }
}

module.exports = Frame;
