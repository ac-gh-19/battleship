export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.winner = null;
  }

  switchTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }

  makeMove([x, y]) {
    let opponent;
    if (this.currentPlayer === this.player1) {
      opponent = this.player2;
    } else {
      opponent = this.player1;
    }

    let result = this.currentPlayer.attack(opponent, [x, y]);
    if (result) {
      if (this.gameOver()) {
        this.winner = this.currentPlayer;
      }
      if (result == "miss") {
        this.switchTurn();
      }
      return true;
    }
    return false;
  }

  // if all player 1 all ships sunk or
  // player 2 all ships sunk then game over
  // winner will be currentPlayer bec most recent attack
  gameOver() {
    return (
      this.player1.gameboard.allShipsSunk() ||
      this.player2.gameboard.allShipsSunk()
    );
  }
}
