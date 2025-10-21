import Gameboard from "./gameboard.js";
class Player {
  constructor(name = "CPU") {
    this.name = name;
    name === "CPU" ? (this.type = "Computer") : (this.type = "Human");
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
