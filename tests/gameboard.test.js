import Gameboard from "../src/logic/gameboard.js";
import Ship from "../src/logic/ship.js";

test("Gameboard Initilization", () => {
  let game = new Gameboard(10);
  let expectedBoard = [];
  for (let i = 0; i < 10; ++i) {
    let row = [];
    for (let j = 0; j < 10; ++j) {
      row[j] = null;
    }
    expectedBoard.push(row);
  }
  expect(game.board).toEqual(expectedBoard);
});

test("Out of Bounds Ship Placement", () => {
  let game = new Gameboard(10);
  let ship = new Ship(5);
  expect(game.placeShip(ship, [0, 6], "vertical")).toBe(false);

  expect(game.placeShip(ship, [6, 0], "horizontal")).toBe(false);

  let ship2 = new Ship(2);
  expect(game.placeShip(ship2, [5, 9], "vertical")).toBe(false);

  expect(game.placeShip(ship2, [9, 5], "horizontal")).toBe(false);
});

test("Place Ship Correctly", () => {
  let game = new Gameboard(5);
  let ship = new Ship(3);

  game.placeShip(ship, [0, 0]);
  expect(game.board[0][0]).toBe(ship);
  expect(game.board[0][1]).toBe(ship);
  expect(game.board[0][2]).toBe(ship);
  expect(game.ships.length).toBe(1);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [4, 3], "vertical");
  expect(game.board[3][4]).toBe(ship2);
  expect(game.board[4][4]).toBe(ship2);
  expect(game.ships.length).toBe(2);

  let ship3 = new Ship(4);
  game.placeShip(ship3, [0, 2], "horizontal");
  expect(game.board[2][0]).toBe(ship3);
  expect(game.board[2][1]).toBe(ship3);
  expect(game.board[2][2]).toBe(ship3);
  expect(game.board[2][3]).toBe(ship3);
  expect(game.ships.length).toBe(3);
});

test("Placing Ship on Overlapping Ship", () => {
  let game = new Gameboard(5);
  let obstacle = new Ship(3);
  game.placeShip(obstacle, [1, 2], "horizontal");
  // how the gameboard looks 0 = empty 1 = ship
  //   [
  //     [0,0,0,0,0],
  //     [0,0,0,0,0],
  //     [0,1,1,1,0],
  //     [0,0,0,0,0],
  //     [0,0,0,0,0]
  //   ]

  let ship = new Ship(3);
  expect(game.placeShip(ship, [1, 1], "vertical")).toBe(false);

  expect(game.placeShip(ship, [0, 2], "horizontal")).toBe(false);

  expect(game.placeShip(ship, [2, 0], "vertical")).toBe(false);
});

test("Board Receives Attack", () => {
  let game = new Gameboard(3);

  expect(game.receiveAttack([0, 0])).toBe(true);
  expect(game.receiveAttack([1, 0])).toBe(true);
  expect(game.receiveAttack([2, 0])).toBe(true);
});

test("Ship Registers Hit on Board Pos Attacked", () => {
  let game = new Gameboard(3);
  let ship = new Ship(2);
  game.placeShip(ship, [0, 0], "horizontal");

  game.receiveAttack([2, 0]);
  expect(ship.health).toBe(2);
  game.receiveAttack([0, 0]);
  expect(ship.health).toBe(1);
  game.receiveAttack([1, 0]);
  expect(ship.health).toBe(0);
});

test("Board Cell Registers Misses", () => {
  let game = new Gameboard(3);

  expect(game.missedCells.some(([x, y]) => x == 0 && y == 0)).toBe(false);

  game.receiveAttack([0, 0]);
  expect(game.missedCells.some(([x, y]) => x == 0 && y == 0)).toBe(true);

  expect(game.missedCells.some(([x, y]) => x == 2 && y == 2)).toBe(false);

  game.receiveAttack([2, 2]);
  expect(game.missedCells.some(([x, y]) => x == 2 && y == 2)).toBe(true);
});

test("Board Cell Registers Hits", () => {
  let game = new Gameboard(3);
  let ship = new Ship(2);

  game.placeShip(ship, [0, 0], "horizontal");

  expect(game.hitCells.some(([x, y]) => x == 0 && y == 0)).toBe(false);

  game.receiveAttack([0, 0]);
  expect(game.hitCells.some(([x, y]) => x == 0 && y == 0)).toBe(true);

  expect(game.hitCells.some(([x, y]) => x == 1 && y == 0)).toBe(false);

  game.receiveAttack([1, 0]);
  expect(game.hitCells.some(([x, y]) => x == 1 && y == 0)).toBe(true);
});

test("Board Cell is Already Attacked", () => {
  let game = new Gameboard(3);
  game.receiveAttack([0, 0]);
  expect(game.receiveAttack([0, 0])).toBe(false);

  game.receiveAttack([1, 0]);
  expect(game.receiveAttack([1, 0])).toBe(false);
});

test("All Ships Sunk", () => {
  let game = new Gameboard(3);
  expect(game.allShipsSunk()).toBe(true);

  let ship = new Ship(1);
  game.placeShip(ship, [0, 0], "horizontal");
  expect(game.allShipsSunk()).toBe(false);

  game.receiveAttack([0, 0]);
  expect(game.allShipsSunk()).toBe(true);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [0, 1], "horizontal");

  game.receiveAttack([0, 1]);
  expect(game.allShipsSunk()).toBe(false);
  game.receiveAttack([1, 1]);
  expect(game.allShipsSunk()).toBe(true);
});
