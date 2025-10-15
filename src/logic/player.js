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

  getRandMove() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    return { x, y, direction };
  }

  lost() {
    return this.gameboard.allShipsSunk();
  }
}

export default Player;
