import GameController from "../src/logic/gameController.js";
import Player from "../src/logic/player.js";
import Ship from "../src/logic/ship.js";

// We've already tested the Player, Ship, and Gameboard functions individually.
// In theory, this means the GameController functions should work since they
// rely on those modules and just call upon those functions. However, we're
// testing the GameController as well to ensure they integrate correctly.

test("Game Setup Initializes Two Player Instances", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);
  expect(game.player1).toBe(player1);
  expect(game.player2).toBe(player2);
});

test("Switches Turns Between Players", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  expect(game.currentPlayer).toBe(player1);
  game.switchTurn();
  expect(game.currentPlayer).toBe(player2);
  game.switchTurn();
  expect(game.currentPlayer).toBe(player1);
});

test("Invalid Move Does Not Switch Turn", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  game.makeMove([0, 0]);
  // manually switch currentPlayer to player1 again
  // because makeMove switches other player at end
  game.currentPlayer = player1;
  expect(game.makeMove([0, 0])).toBe(false);
  expect(game.currentPlayer).toBe(player1);
});

test("Attacking Affects Opponent's Board", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  game.makeMove([0, 0]);
  expect(player2.gameboard.board[0][0].isAttacked).toBe(true);

  // current player should now be player2 as
  // makeMove calls switchTurn() at the end
  game.makeMove([0, 0]);
  expect(player1.gameboard.board[0][0].isAttacked).toBe(true);
});

test("Prevents Attacking the Same Position", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  game.makeMove([0, 0]);
  // manually switch currentPlayer to player1 again
  // because makeMove switches other player at end
  game.currentPlayer = player1;
  expect(game.makeMove([0, 0])).toBe(false);
});

test("Detects When Game is or Isn't Over", () => {
  let player1 = new Player("AC", "Human");
  let player2 = new Player("CPU", "Computer");
  let game = new GameController(player1, player2);

  player1.gameboard.placeShip(new Ship(1), [0, 0], "horizontal");
  player2.gameboard.placeShip(new Ship(1), [0, 0], "horizontal");
  expect(game.gameOver()).toBe(false);
  game.makeMove([0, 0]);
  expect(game.gameOver()).toBe(true);
});
