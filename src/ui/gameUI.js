import { updateBoardUI } from "./helpers";
import createBoard from "../../components/createBoard";
import { createPlayerContainer } from "../../components/createPlayerContainer";
import { createGame } from "../../components/createGameContainer";

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
    gameInfo,
    p1Board: playerOneContainer.querySelector(
      `[data-board="${playerOne.name}"]`,
    ),
    p2Board: playerTwoContainer.querySelector(
      `[data-board="${playerTwo.name}"]`,
    ),
  };
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
