import GameController from "../logic/gameController";
import Player from "../logic/player";
import createBoard from "../components/createBoard";
import { createPlayerContainer } from "../components/createPlayerContainer";
import { createGame } from "../components/createGameContainer";
import { updateBoardUI } from "./helpers";
import { clearBoardUI } from "./helpers";
import { renderGameLayout, renderGameInfo, renderBoards } from "./gameView";

export function loadGame(playerOne, playerTwo) {
  let app = document.querySelector("#app");
  let game = new GameController(playerOne, playerTwo);

  let { gameInfo, p1Board, p2Board } = renderGameLayout(app, playerOne, playerTwo, createGame);

  renderBoards(playerOne, playerTwo);
  renderGameInfo(gameInfo, game);

  p1Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerTwo) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerTwo, playerOne, [x,y], gameInfo)
  })
  p2Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerOne) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerOne, playerTwo, [x,y], gameInfo)
  });
}

function playMove(game, attacker, opponent, [x,y], gameInfo) {
  game.makeMove([x,y]);
  renderBoards(attacker, opponent);
  renderGameInfo(gameInfo, game);
};
