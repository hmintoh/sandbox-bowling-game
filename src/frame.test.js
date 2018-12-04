const Frame = require("./frame");
let currentFrame;
let nextFrame;

describe("isComplete() for non-last frames", () => {
  beforeEach(() => {
    currentFrame = new Frame();
    nextFrame = new Frame();
  });

  test("incomplete frame", () => {
    currentFrame.setNextFrame(nextFrame);
    expect(currentFrame.isComplete()).toBeFalsy();
  });

  test("incomplete frame", () => {
    currentFrame.roll(3);
    currentFrame.setNextFrame(nextFrame);
    expect(currentFrame.isComplete()).toBeFalsy();
  });

  test("complete strike frame should only have 1 roll", () => {
    currentFrame.roll(10);
    currentFrame.setNextFrame(nextFrame);
    expect(currentFrame.isStrike()).toBeTruthy();
    expect(currentFrame.isComplete()).toBeTruthy();
  });

  test("complete spare frame should only have 2 rolls", () => {
    currentFrame.roll(5);
    currentFrame.roll(5);
    currentFrame.setNextFrame(nextFrame);
    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.isSpare()).toBeTruthy();
  });

  test("complete non-strike, non-spare frame should only have 2 rolls", () => {
    currentFrame.roll(2);
    currentFrame.roll(4);
    currentFrame.setNextFrame(nextFrame);
    expect(currentFrame.isStrike()).toBeFalsy();
    expect(currentFrame.isSpare()).toBeFalsy();
    expect(currentFrame.isComplete()).toBeTruthy();
  });
});

describe("isComplete() for last frames", () => {
  beforeEach(() => {
    currentFrame = new Frame();
  });

  test("complete non-strike, non-spare frame should only have 2 rolls", () => {
    currentFrame.roll(2);
    currentFrame.roll(5);
    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.isLastFrame()).toBeTruthy();
  });

  test("complete spare frame should have 3 rolls", () => {
    currentFrame.roll(5);
    currentFrame.roll(5);
    currentFrame.roll(5);
    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.isLastFrame()).toBeTruthy();
  });

  test("complete strike frame should have 3 rolls", () => {
    currentFrame.roll(10);
    currentFrame.roll(5);
    currentFrame.roll(5);
    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.isLastFrame()).toBeTruthy();
  });
});

describe("frameScore()", () => {
  beforeEach(() => {
    currentFrame = new Frame();
    nextFrame = new Frame();
  });

  test("non-last, non-spare and non-strike frame", () => {
    currentFrame.roll(3);
    currentFrame.roll(3);
    currentFrame.setNextFrame(nextFrame);
    nextFrame.roll(5);

    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.frameScore()).toEqual(6);
  });

  test("non-last, spare frame", () => {
    currentFrame.roll(2);
    currentFrame.roll(8);
    currentFrame.setNextFrame(nextFrame);
    nextFrame.roll(3);

    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.frameScore()).toEqual(13);
  });

  test("non-last, spike frame", () => {
    currentFrame.roll(10);
    currentFrame.setNextFrame(nextFrame);
    nextFrame.roll(3);
    nextFrame.roll(0);

    expect(currentFrame.isComplete()).toBeTruthy();
    expect(currentFrame.frameScore()).toEqual(16);
  });
});
