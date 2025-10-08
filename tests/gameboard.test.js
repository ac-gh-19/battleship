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
    game.placeShip(ship, [0, 5], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship, [5, 0]);
  }).toThrow("Cannot place ship here - out of bounds");


let ship2 = new Ship(2);
  expect(() => {
    game.placeShip(ship2, [5, 9], "vertical");
  }).toThrow("Cannot place ship here - out of bounds");

  expect(() => {
    game.placeShip(ship2, [9, 9]);
  }).toThrow("Cannot place ship here - out of bounds");
});
