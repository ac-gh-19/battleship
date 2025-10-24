import GameController from "../logic/gameController";
import { createGame } from "../components/createGameContainer";
import { renderGameLayout, renderGameInfo, renderBoards } from "./gameView";

export function loadGame(playerOne, playerTwo) {
  let app = document.querySelector("#app");
  let game = new GameController(playerOne, playerTwo);

  let { gameInfo, p1Board, p2Board } = renderGameLayout(
    app,
    playerOne,
    playerTwo,
    createGame,
  );

  renderBoards(playerOne, playerTwo);
  renderGameInfo(gameInfo, game);

  p1Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerTwo) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerTwo, playerOne, [x, y], gameInfo);
  });
  p2Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerOne) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerOne, playerTwo, [x, y], gameInfo);

    if (
      playerTwo.type == "Computer" &&
      !game.winner &&
      game.currentPlayer == playerTwo
    ) {
      setTimeout(() => {
        playMove(game, playerTwo, playerOne, [x, y], gameInfo);
      }, 750);
    }
  });
}

function playMove(game, attacker, opponent, [x, y], gameInfo) {
  if (attacker.type == "Computer") {
    do {
      ({ x, y } = attacker.gameboard.getRandMove());
    } while (!game.makeMove([x, y]));
    renderBoards(attacker, opponent);
    renderGameInfo(gameInfo, game);

    if (game.currentPlayer == attacker) {
      setTimeout(() => {
        playMove(game, attacker, opponent, [x, y], gameInfo);
      }, 500);
    }
  } else {
    game.makeMove([x, y]);
  }
  renderBoards(attacker, opponent);
  renderGameInfo(gameInfo, game);
}
