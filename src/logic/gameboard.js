import Ship from "./ship";

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
        row[j] = null;
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
      return false;
    }

    if (this.isOverlappingShip([x, y], ship.length, direction)) {
      return false;
    }

    let shipPositions = [];
    for (let i = 0; i < ship.length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      this.board[yi][xi] = ship;
      shipPositions.push([xi, yi]);
    }

    this.ships.push(ship);
    shipPositions.forEach((position) => ship.positions.push(position));
    return true;
  }

  randomlyPlaceShips(lengthOfShipsToPlace) {
    for (let lengthOfShip of lengthOfShipsToPlace) {
      let placed = false;
      while (!placed) {
        let { x, y, direction } = this.getRandMove();
        if (this.placeShip(new Ship(lengthOfShip), [x, y], direction)) {
          placed = true;
        }
      }
    }
  }

  receiveAttack([x, y]) {
    let isAttacked =
      this.hitCells.some(([xi, yi]) => xi == x && yi == y) ||
      this.missedCells.some(([xi, yi]) => xi == x && yi == y);

    if (isAttacked) return false;

    let ship = this.board[y][x];
    let result;

    if (!ship) {
      this.missedCells.push([x, y]);
      result = "miss";
    } else {
      ship.hit();
      this.hitCells.push([x, y]);
      result = "hit";
    }
    return result;
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
      if (this.board[yi][xi]) {
        return true;
      }
    }
    return false;
  }

  getRandMove() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    return { x, y, direction };
  }
}

export default Gameboard;
