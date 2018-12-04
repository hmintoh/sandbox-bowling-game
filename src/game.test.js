const Game = require("./game");
let game = new Game();

describe("Game", () => {
  test("gutter frame", () => {
    rollMany(game, 2, 0);
    expect(game.gameScore()).toEqual(0);
  });

  rollMany = (game, n, pin) => {
    for (let i = 1; i <= n; i++) {
      game.roll(pin);
    }
  };
});
