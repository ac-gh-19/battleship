class Ship {
  constructor(length) {
    this.length = length;
    this.isSunk = false;
    this.health = length;
  }

  hit() {
    if (this.health == 0) return;
    this.health--;
    if (this.isShipSunk()) this.isSunk = true;
  }

  isShipSunk() {
    return this.health == 0;
  }
}

export default Ship;
