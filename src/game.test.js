const Game = require("./game");
let game = new Game();

describe("Game", () => {
  beforeEach(() => (game = new Game()));

  test("gutter set", () => {
    rollMany(game, 20, 0);
    expect(game.gameScore()).toEqual(0);
  });

  test("set with 1 point each", () => {
    rollMany(game, 20, 1);
    expect(game.gameScore()).toEqual(20);
  });

  test("perfect score", () => {
    rollMany(game, 10, 10);
    game.roll(10);
    game.roll(10);
    expect(game.gameScore()).toEqual(300);
  });

  test("first frame is strike with rest on gutter", () => {
    game.roll(10);
    game.roll(1);
    game.roll(1);
    rollMany(game, 16, 0);
    expect(game.gameScore()).toEqual(14);
  });

  test("first frame is spare with rest on gutter", () => {
    game.roll(7);
    game.roll(3);
    game.roll(1);
    rollMany(game, 17, 0);
    expect(game.gameScore()).toEqual(12);
  });

  rollMany = (game, n, pin) => {
    for (let i = 1; i <= n; i++) {
      game.roll(pin);
    }
  };
});
