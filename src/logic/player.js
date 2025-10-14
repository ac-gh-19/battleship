import Gameboard from "./gameboard.js";
class Player {
  constructor(name = "CPU", type = "Computer") {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard(10);
  }

  attack(opponent, [x, y]) {
    return opponent.gameboard.receiveAttack([x, y]);
  }

  lost() {
    return this.gameboard.allShipsSunk();
  }
}

export default Player;
