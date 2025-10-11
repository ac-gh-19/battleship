class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
    this.positions = [];
  }

  hit() {
    if (!this.isSunk()) this.health--;
  }

  isSunk() {
    return this.health == 0;
  }
}

export default Ship;
