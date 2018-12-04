const Frame = require("./frame");
let frame;

describe("isComplete() for non-last frames", () => {
  beforeEach(() => (frame = new Frame()));

  test("incomplete frame", () => {
    expect(frame.isComplete()).toBeFalsy();
  });

  test("incomplete frame", () => {
    frame.roll(5);
    expect(frame.isComplete()).toBeFalsy();
  });

  test("complete strike frame should only have 1 roll", () => {
    frame.roll(10);
    expect(frame.isComplete()).toBeTruthy();
  });

  test("complete spare frame should only have 2 rolls", () => {
    frame.roll(5);
    frame.roll(5);
    expect(frame.isComplete()).toBeTruthy();
  });

  test("complete non-strike, non-spare frame should only have 2 rolls", () => {
    frame.roll(3);
    frame.roll(5);
    expect(frame.isComplete()).toBeTruthy();
  });
});
