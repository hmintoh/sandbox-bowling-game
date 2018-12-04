class Frame {
  constructor() {
    this.rollsArray = [];
  }

  roll(pins) {
    this.rollsArray.push(pins);
  }

  isComplete() {
    if (this.isStrike()) {
      return true;
    } else if (this.isSpare()) {
      return true;
    } else if (this.rollsArray.length === 2) {
      return true;
    } else {
      return false;
    }
  }

  isStrike() {
    return this.rollsArray[0] === 10;
  }

  isSpare() {
    return this.rollsArray[0] + this.rollsArray[1] === 10;
  }
}

module.exports = Frame;
