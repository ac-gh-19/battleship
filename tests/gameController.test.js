import GameController from "../src/logic/gameController.js";
import Player from "../src/logic/player.js";
import Ship from "../src/logic/ship.js";

// We've already tested the Player, Ship, and Gameboard functions individually.
// In theory, this means the GameController functions should work since they
// rely on those modules and just call upon those functions. However, we're
// testing the GameController as well to ensure they integrate correctly.

test("Game Setup Initializes Two Player Instances", () => {
  let player1 = new Player("AC");
  let player2 = new Player("CPU");
  let game = new GameController(player1, player2);
  expect(game.player1).toBe(player1);
  expect(game.player2).toBe(player2);
});

test("Switches Turns Between Players", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  expect(game.currentPlayer).toBe(game.player1);
  game.switchTurn();
  expect(game.currentPlayer).toBe(game.player2);
  game.switchTurn();
  expect(game.currentPlayer).toBe(game.player1);
});

test("Invalid Move Does Not Switch Turn", () => {
  let player1 = new Player("AC");
  let player2 = new Player();
  let game = new GameController(player1, player2);

  expect(game.currentPlayer).toBe(game.player1);
  game.player1.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
  game.player2.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
  expect(game.makeMove([0, 0])).toBe(true);
  expect(game.currentPlayer).toBe(game.player1);
  expect(game.makeMove([0, 0])).toBe(false);
  expect(game.currentPlayer).toBe(game.player1);
});

test("Hitting Ship Doesn't Change Turn", () => {
  let player1 = new Player("AC");
  let player2 = new Player();
  let game = new GameController(player1, player2);

  expect(game.currentPlayer).toBe(game.player1);
  game.player1.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
  game.player2.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
  expect(game.makeMove([0, 0])).toBe(true);
  expect(game.currentPlayer).toBe(game.player1);
  expect(game.makeMove([0, 1])).toBe(true);
  expect(game.currentPlayer).toBe(game.player1);
  expect(game.makeMove([0, 2])).toBe(true);
});

test("Attacking Affects Opponent's Board", () => {
  let player1 = new Player("AC");
  let player2 = new Player("CPU");
  let game = new GameController(player1, player2);

  game.player1.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");
  game.player2.gameboard.placeShip(new Ship(3), [0, 0], "horizontal");

  game.makeMove([0, 0]);
  expect(game.player2.gameboard.board[0][0].health).toBe(2);

  // manually switch currentPlayer to player2
  // because hitting ship doesn't change player turn;
  game.currentPlayer = player2;
  game.makeMove([0, 0]);
  expect(game.player1.gameboard.board[0][0].health).toBe(2);
});

test("Prevents Attacking the Same Position", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  game.makeMove([0, 0]);
  expect(game.makeMove([0, 0])).toBe(false);
});

test("Detects When Game is or Isn't Over", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  game.player1.gameboard.placeShip(new Ship(1), [0, 0], "horizontal");
  game.player2.gameboard.placeShip(new Ship(1), [0, 0], "horizontal");
  expect(game.gameOver()).toBe(false);
  game.makeMove([0, 0]);
  expect(game.gameOver()).toBe(true);
  expect(game.winner).toBe(game.player1);
});
