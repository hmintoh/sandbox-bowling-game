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
    currentFrame = new Frame(10);
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
    nonLastFrame = new Frame(9);
    lastFrame = new Frame(10);
  });

  test("an incompete frame does not have a score", () => {
    expect(() => nonLastFrame.frameScore()).toThrowError(Error);
  });

  test("non-last, non-spare and non-strike frame", () => {
    nonLastFrame.roll(3);
    nonLastFrame.roll(3);
    nonLastFrame.setNextFrame(lastFrame);
    lastFrame.roll(5);

    expect(nonLastFrame.isComplete()).toBeTruthy();
    expect(nonLastFrame.frameScore()).toEqual(6);
  });

  test("non-last, spare frame", () => {
    nonLastFrame.roll(2);
    nonLastFrame.roll(8);
    nonLastFrame.setNextFrame(lastFrame);
    lastFrame.roll(3);

    expect(nonLastFrame.isComplete()).toBeTruthy();
    expect(nonLastFrame.frameScore()).toEqual(13);
  });

  test("non-last, spike frame", () => {
    nonLastFrame.roll(10);
    nonLastFrame.setNextFrame(lastFrame);
    lastFrame.roll(3);
    lastFrame.roll(0);

    expect(nonLastFrame.isComplete()).toBeTruthy();
    expect(nonLastFrame.frameScore()).toEqual(13);
  });

  test("last, non-spike, non-spare frame", () => {
    lastFrame.roll(3);
    lastFrame.roll(3);

    expect(lastFrame.isComplete()).toBeTruthy();
    expect(lastFrame.frameScore()).toEqual(6);
  });

  test("last, spare frame", () => {
    lastFrame.roll(3);
    lastFrame.roll(7);
    lastFrame.roll(3);

    expect(lastFrame.isComplete()).toBeTruthy();
    expect(lastFrame.frameScore()).toEqual(13);
  });

  test("last, strike frame", () => {
    lastFrame.roll(10);
    lastFrame.roll(7);
    lastFrame.roll(3);

    expect(lastFrame.isComplete()).toBeTruthy();
    expect(lastFrame.frameScore()).toEqual(20);
  });
});
