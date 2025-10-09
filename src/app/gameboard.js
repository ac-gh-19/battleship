import { cellStates, createCell } from "./cell";
class Gameboard {
  constructor(size) {
    this.board = this.createBoard(size);
    this.boardSize = size;
    this.ships = [];
  }

  createBoard(size) {
    let board = [];
    for (let i = 0; i < size; ++i) {
      let row = [];
      for (let j = 0; j < size; ++j) {
        row[j] = createCell();
      }
      board.push(row);
    }
    return board;
  }

  placeShip(ship, [x, y], direction = "horizontal") {
    if (this.isOutOfBounds([x, y], ship.length, direction)) {
      throw new Error("Cannot place ship here - out of bounds");
    }

    if (this.isOverlappingShip([x, y], ship.length, direction)) {
      throw new Error("Ship placed on overlapping ship");
    }

    for (let i = 0; i < ship.length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      let cell = this.board[yi][xi];
      cell.ship = ship;
      cell.state = cellStates.SHIP;
      this.board[yi][xi] = cell;
    }

    this.ships.push(ship);
    return true;
  }

  // receiveAttack([x, y]) {
  // }

  // Helper Functions
  isOutOfBounds([x, y], length, direction) {
    if (direction == "horizontal") {
      return x + length > this.boardSize;
    }
    // direction = vertical
    return y + length > this.boardSize;
  }

  isOverlappingShip([x, y], length, direction) {
    for (let i = 0; i < length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      if (this.board[yi][xi].ship != null) {
        return true;
      }
    }
    return false;
  }
}

export default Gameboard;
