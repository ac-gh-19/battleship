import { updateBoardUI } from "../controllers/helpers";
import createBoard from "../components/createBoard";
import { createPlayerContainer } from "../components/createPlayerContainer";
import { createGame } from "../components/createGameContainer";

export function createPlayerWrapperContainer(player) {
  let playerBoardUI = createBoard(player.name);
  let playerContainer = createPlayerContainer(player, playerBoardUI);
  return playerContainer;
}

export function renderGameLayout(playerOne, playerTwo) {
  let app = document.querySelector("#app");
  app.textContent = "";

  let playerOneContainer = createPlayerWrapperContainer(playerOne);
  let playerTwoContainer = createPlayerWrapperContainer(playerTwo);
  let { gameInfo, gameContainer } = createGame(playerOne, playerTwo);

  gameContainer.append(playerOneContainer);
  gameContainer.append(playerTwoContainer);
  app.appendChild(gameInfo);
  app.appendChild(gameContainer);

  return {
    playerOneContainer,
    playerTwoContainer,
    gameInfo,
    p1Board: playerOneContainer.querySelector(
      `[data-board="${playerOne.name}"]`,
    ),
    p2Board: playerTwoContainer.querySelector(
      `[data-board="${playerTwo.name}"]`,
    ),
  };
}

export function renderContainers(game, p1Container, p2Container) {
  if (game.currentPlayer == game.player1) {
    p1Container.classList.add("disableClick");
    p2Container.classList.remove("disableClick");
  } else {
    p1Container.classList.remove("disableClick");
    // Disables player one from clicking own board while
    // CPU is making their moves
    if (game.player2.type == "Computer") {
      p1Container.style.pointerEvents = "none";
    }
    p2Container.classList.add("disableClick");
  }
}

export function renderGameInfo(infoEl, game) {
  if (game.winner) {
    infoEl.textContent = `WINNER IS ${game.winner.name}!`;
  } else {
    infoEl.textContent = `${game.currentPlayer.name}'s Turn!`;
  }
}

export function renderBoards(playerOne, playerTwo) {
  updateBoardUI(playerOne);
  updateBoardUI(playerTwo);
}
