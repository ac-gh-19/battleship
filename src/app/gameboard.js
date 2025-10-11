import { cellStates, createCell } from "./cell";
class Gameboard {
  constructor(size) {
    this.board = this.initBoard(size);
    this.boardSize = size;
    this.ships = [];
    this.hitCells = [];
    this.missedCells = [];
  }

  initBoard(size) {
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

  // Coordinates are [x,y] where x = horizontal position on board
  // y = vertical position on board ,[2,3] would mean 2 position right
  // and 3 position down accessed at this.board[3][2]

  placeShip(ship, [x, y], direction = "horizontal") {
    if (this.isOutOfBounds([x, y], ship.length, direction)) {
      throw new Error("Cannot place ship here - out of bounds");
    }

    if (this.isOverlappingShip([x, y], ship.length, direction)) {
      throw new Error("Ship placed on overlapping ship");
    }

    let shipPositions = [];
    for (let i = 0; i < ship.length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      let cell = this.board[yi][xi];
      shipPositions.push([xi, yi]);
      cell.ship = ship;
      cell.state = cellStates.SHIP;
    }

    this.ships.push(ship);
    ship.positions = shipPositions;
    return true;
  }

  receiveAttack([x, y]) {
    let cell = this.board[y][x];
    if (cell.isAttacked) {
      return false;
    }

    cell.isAttacked = true;

    if (cell.ship) {
      let ship = cell.ship;
      ship.hit();
      cell.state = cellStates.HIT;
      this.hitCells.push([x, y]);
    } else {
      cell.state = cellStates.MISS;
      this.missedCells.push([x, y]);
    }

    return true;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.health == 0);
  }

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
