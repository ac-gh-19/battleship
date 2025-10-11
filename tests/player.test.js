import Player from "../src/app/player.js";
import Gameboard from "../src/app/gameboard.js";

test("Player Initialization", () => {
  let cpu = new Player();
  let player = new Player("AC", "Human");

  expect(cpu).toEqual({
    name: "CPU",
    type: "Computer",
    gameboard: new Gameboard(10),
  });

  expect(player).toEqual({
    name: "AC",
    type: "Human",
    gameboard: new Gameboard(10),
  });
});
