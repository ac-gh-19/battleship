import Game from "../logic/gameController";
import { renderGameLayout, renderGameInfo, renderBoards } from "../ui/gameUI";
import { renderContainers } from "../ui/gameUI";
import { loadFrontPage } from "./frontPageController";
import "../styles/game.css";

export function loadGame(playerOne, playerTwo) {
  let game = new Game(playerOne, playerTwo);

  let { playerOneContainer, playerTwoContainer, gameInfo, p1Board, p2Board } =
    renderGameLayout(playerOne, playerTwo);

  renderBoards(playerOne, playerTwo);
  renderContainers(game, playerOneContainer, playerTwoContainer);
  renderGameInfo(gameInfo, game);

  p1Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerTwo || game.gameOver()) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerTwo, playerOne, [x, y], gameInfo);
    renderContainers(game, playerOneContainer, playerTwoContainer);
  });

  p2Board.addEventListener("click", (e) => {
    if (game.currentPlayer != playerOne || game.gameOver()) return;
    let [x, y] = [e.target.dataset.x, e.target.dataset.y];
    playMove(game, playerOne, playerTwo, [x, y], gameInfo);
    renderContainers(game, playerOneContainer, playerTwoContainer);

    // If opponent is CPU, we want to automatically play move
    // after player one's turn (after p2Board is clicked). Add
    // timeout so CPU seems a bit more realistic.
    if (
      playerTwo.type == "Computer" &&
      !game.winner &&
      game.currentPlayer == playerTwo
    ) {
      setTimeout(() => {
        playMove(game, playerTwo, playerOne, [x, y], gameInfo);
        renderContainers(game, playerOneContainer, playerTwoContainer);
      }, 750);
    }
  });

  function playMove(game, attacker, opponent, [x, y], gameInfo) {
    if (attacker.type == "Computer") {
      // Generates random moves until valid hit on board
      do {
        ({ x, y } = attacker.gameboard.getRandMove());
      } while (!game.makeMove([x, y]));
      // If CPU hits ship successfully, turn doesn't swap and we
      // recursively play move again. Need to render board before
      // that so it doesn't update hits all at once.
      renderBoards(attacker, opponent);
      renderGameInfo(gameInfo, game);

      if (game.currentPlayer == attacker) {
        setTimeout(() => {
          playMove(game, attacker, opponent, [x, y], gameInfo);
          renderContainers(game, playerOneContainer, playerTwoContainer);
        }, 500);
      }
    } else {
      game.makeMove([x, y]);
    }
    renderBoards(attacker, opponent);
    renderGameInfo(gameInfo, game);
  }
}

export function init() {
  loadFrontPage();
}
 
