class Gameboard {
  constructor(size) {
    this.board = this.createBoard(size);
    this.boardSize = size;
    this.ships = [];
  }

  createBoard(size) {
    let board = new Array(size).fill("").map(() => new Array(size).fill(0));
    return board;
  }

  placeShip(ship, [x, y], direction = "horizontal") {
    if (this.isOutOfBounds([x, y], ship.length, direction)) {
      throw new Error("Cannot place ship here - out of bounds");
    }

    if (this.isOverlappingShip([x,y], ship.length, direction)) {
      throw new Error("Ship placed on overlapping ship");
    }

    for (let i = 0; i < ship.length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      this.board[yi][xi] = ship;
    }
    
    this.ships.push(ship);
    return true;
  }


  isOutOfBounds([x, y], length, direction) {
    if (direction == "horizontal") {
      return x + length > this.boardSize;
    }
    // direction = vertical
    return y + length > this.boardSize;
  }


  isOverlappingShip([x,y], length, direction) {
    for (let i = 0; i < length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      if (this.board[yi][xi] != 0) {
        return true;
      }
    }
    return false;
  }


  receiveAttack([x, y]) {
    if (this.board[y][x] == 1) {
      return false;
    } else if (this.board[y][x] == 0) {
      this.board[y][x] = 1;
      return true;
    } else {
      let ship = this.board[y][x];
      ship.hit();
      return true;
    }
  }
}

export default Gameboard;
