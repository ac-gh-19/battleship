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

test("Place Ship Correctly", () => {
  let game = new Gameboard(5);
  let ship = new Ship(3);

  game.placeShip(ship, [0, 0]);
  expect(game.board[0][0]).toEqual({
    state: cellStates.SHIP,
    ship: ship,
    isAttacked: false,
  });
  expect(game.board[0][1]).toEqual({
    state: cellStates.SHIP,
    ship: ship,
    isAttacked: false,
  });
  expect(game.board[0][2]).toEqual({
    state: cellStates.SHIP,
    ship: ship,
    isAttacked: false,
  });
  expect(game.ships.length).toBe(1);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [4, 3], "vertical");
  expect(game.board[3][4]).toEqual({
    state: cellStates.SHIP,
    ship: ship2,
    isAttacked: false,
  });
  expect(game.board[4][4]).toEqual({
    state: cellStates.SHIP,
    ship: ship2,
    isAttacked: false,
  });
  expect(game.ships.length).toBe(2);

  let ship3 = new Ship(4);
  game.placeShip(ship3, [0, 2], "horizontal");
  expect(game.board[2][0]).toEqual({
    state: cellStates.SHIP,
    ship: ship3,
    isAttacked: false,
  });
  expect(game.board[2][1]).toEqual({
    state: cellStates.SHIP,
    ship: ship3,
    isAttacked: false,
  });
  expect(game.board[2][2]).toEqual({
    state: cellStates.SHIP,
    ship: ship3,
    isAttacked: false,
  });
  expect(game.board[2][3]).toEqual({
    state: cellStates.SHIP,
    ship: ship3,
    isAttacked: false,
  });
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

test("Board Receives Attack", () => {
  let game = new Gameboard(3);

  expect(game.receiveAttack([0, 0])).toBe(true);
  expect(game.receiveAttack([1, 0])).toBe(true);
  expect(game.receiveAttack([2, 0])).toBe(true);
});

test("Ship Registers Hit on Board Pos Attacked", () => {
  let game = new Gameboard(3);
  let ship = new Ship(2);
  game.placeShip(ship, [0,0], "horizontal");

  game.receiveAttack([2,0]);
  expect(ship.health).toBe(2);
  game.receiveAttack([0,0])
  expect(ship.health).toBe(1);
  game.receiveAttack([1,0]);
  expect(ship.health).toBe(0);
});

test("Board Cell Registers Misses", () => {
  let game = new Gameboard(3);

  expect(game.board[0][0]).toEqual({
    state: cellStates.EMPTY,
    ship: null,
    isAttacked: false,
  });

  game.receiveAttack([0, 0]);
  expect(game.board[0][0]).toEqual({
    state: cellStates.MISS,
    ship: null,
    isAttacked: true,
  });

  expect(game.board[2][2]).toEqual({
    state: cellStates.EMPTY,
    ship: null,
    isAttacked: false,
  });

  game.receiveAttack([2, 2]);
  expect(game.board[2][2]).toEqual({
    state: cellStates.MISS,
    ship: null,
    isAttacked: true,
  });
});

test("Board Cell Registers Hits", () => {
  let game = new Gameboard(3);
  let ship = new Ship(2);

  game.placeShip(ship, [0, 0], "horizontal");

  expect(game.board[0][0]).toEqual({
    state: cellStates.SHIP,
    ship: ship,
    isAttacked: false,
  });

  game.receiveAttack([0, 0]);
  expect(game.board[0][0]).toEqual({
    state: cellStates.HIT,
    ship: ship,
    isAttacked: true,
  });

  expect(game.board[0][1]).toEqual({
    state: cellStates.SHIP,
    ship: ship,
    isAttacked: false,
  });

  game.receiveAttack([1, 0]);
  expect(game.board[0][1]).toEqual({
    state: cellStates.HIT,
    ship: ship,
    isAttacked: true,
  });
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
  game.placeShip(ship, [0,0], "horizontal");
  expect(game.allShipsSunk()).toBe(false);

  game.receiveAttack([0,0]);
  expect(game.allShipsSunk()).toBe(true);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [0,1], "horizontal");

  game.receiveAttack([0,1]);
  expect(game.allShipsSunk()).toBe(false);
  game.receiveAttack([1,1]);
  expect(game.allShipsSunk()).toBe(true);
})