import Gameboard from "../src/app/gameboard.js";
import Ship from "../src/app/ship.js";

test("Gameboard Initilization", () => {
  let game = new Gameboard(10);
  let expectedBoard = [];
  for (let i = 0; i < 10; ++i) {
    let row = [];
    for (let j = 0; j < 10; ++j) {
      row[j] = 0;
    }
    expectedBoard.push(row);
  }
  expect(game.board).toEqual(expectedBoard);
});

test("Out of Bounds Ship Placement", () => {
  let game = new Gameboard(10);
  let ship = new Ship(5);
  expect(() => {
    game.placeShip(ship, [6, 0], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship, [0, 6]);
  }).toThrow("Cannot place ship here - out of bounds");

  let ship2 = new Ship(2);
  expect(() => {
    game.placeShip(ship2, [9, 5], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship2, [5, 9]);
  }).toThrow("Cannot place ship here - out of bounds");
});

test("Placing Ship Correctly", () => {
  let game = new Gameboard(5);
  let ship = new Ship(3);

  game.placeShip(ship, [0, 0]);
  expect(game.board).toEqual([
    [ship, ship, ship, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  let ship2 = new Ship(2);
  game.placeShip(ship2, [3, 4], "vertical");
  expect(game.board).toEqual([
    [ship, ship, ship, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, ship2],
    [0, 0, 0, 0, ship2],
  ]);

  let ship3 = new Ship(4);
  game.placeShip(ship3, [2, 0], "horizontal");
  expect(game.board).toEqual([
    [ship, ship, ship, 0, 0],
    [0, 0, 0, 0, 0],
    [ship3, ship3, ship3, ship3, 0],
    [0, 0, 0, 0, ship2],
    [0, 0, 0, 0, ship2],
  ]);
});
