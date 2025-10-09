import Gameboard from "../src/app/gameboard.js";
import Ship from "../src/app/ship.js";
import { cellStates, createCell } from "../src/app/cell.js";

test("Gameboard Initilization", () => {
  let game = new Gameboard(10);
  let expectedBoard = [];
  for (let i = 0; i < 10; ++i) {
    let row = [];
    for (let j = 0; j < 10; ++j) {
      row[j] = createCell();
    }
    expectedBoard.push(row);
  }
  expect(game.board).toEqual(expectedBoard);
});

test("Out of Bounds Ship Placement", () => {
  let game = new Gameboard(10);
  let ship = new Ship(5);
  expect(() => {
    game.placeShip(ship, [0, 6], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship, [6, 0], "horizontal");
  }).toThrow("Cannot place ship here - out of bounds");

  let ship2 = new Ship(2);
  expect(() => {
    game.placeShip(ship2, [5, 9], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship2, [9, 5]);
  }).toThrow("Cannot place ship here - out of bounds");
});

test("Placing Ship Correctly", () => {
  let game = new Gameboard(5);
  let ship = new Ship(3);

  game.placeShip(ship, [0, 0]);
  expect(game.board[0][0]).toEqual({
      state: cellStates.SHIP,
      ship: ship,
      isAttacked: false
  })
  expect(game.board[0][1]).toEqual({
      state: cellStates.SHIP,
      ship: ship,
      isAttacked: false
  })
  expect(game.board[0][2]).toEqual({
      state: cellStates.SHIP,
      ship: ship,
      isAttacked: false
  })
  expect(game.ships.length).toBe(1);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [4, 3], "vertical");
  expect(game.board[3][4]).toEqual({
      state: cellStates.SHIP,
      ship: ship2,
      isAttacked: false
  })
  expect(game.board[4][4]).toEqual({
      state: cellStates.SHIP,
      ship: ship2,
      isAttacked: false
  })
  expect(game.ships.length).toBe(2);

  let ship3 = new Ship(4);
  game.placeShip(ship3, [0, 2], "horizontal");
  expect(game.board[2][0]).toEqual({
      state: cellStates.SHIP,
      ship: ship3,
      isAttacked: false
  })
  expect(game.board[2][1]).toEqual({
      state: cellStates.SHIP,
      ship: ship3,
      isAttacked: false
  })
  expect(game.board[2][2]).toEqual({
      state: cellStates.SHIP,
      ship: ship3,
      isAttacked: false
  })
  expect(game.board[2][3]).toEqual({
      state: cellStates.SHIP,
      ship: ship3,
      isAttacked: false
  })
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
  expect(() => game.placeShip(ship, [1, 1], "vertical")).toThrow(
    "Ship placed on overlapping ship",
  );

  expect(() => game.placeShip(ship, [0, 2], "horizontal")).toThrow(
    "Ship placed on overlapping ship",
  );

  expect(() => game.placeShip(ship, [2, 0], "vertical")).toThrow(
    "Ship placed on overlapping ship",
  );
});

test("Ship Receives Attack", () => {
  let game = new Gameboard(3);
  let ship = new Ship(2);
  game.placeShip(ship, [0, 0], "horizontal");
  // how the gameboard looks 0 = empty 1 = ship
  // [
  //   [1, 1, 0],
  //   [0, 0, 0],
  //   [0, 0, 0]
  // ]

  game.receiveAttack([2, 0]);
  expect(ship.health).toBe(2);
  game.receiveAttack([0, 0]);
  expect(ship.health).toBe(1);
  game.receiveAttack([1, 0]);
  expect(ship.health).toBe(0);
});
