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

    for (let i = 0; i < ship.length; ++i) {
      let xi = direction == "horizontal" ? x + i : x;
      let yi = direction == "vertical" ? y + i : y;
      if (this.board[xi][yi] != 0) {
        throw new Error("Ship already placed in this location");
      }
    }
  }

  isOutOfBounds([x, y], length, direction) {
    if (direction == "horizontal") {
      return x + length >= this.boardSize;
    }
    return y + length >= this.boardSize;
  }
}

export default Gameboard;
