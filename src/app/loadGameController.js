import GameController from "../logic/gameController";
import Player from "../logic/player";
import createBoard from "../components/createBoard";
import { createPlayerContainer } from "../components/createPlayerContainer";
import { createGame } from "../components/createGameContainer";
import { updateBoardUI } from "./helpers";
import { clearBoardUI } from "./helpers";

function createPlayerWrapperContainer(player) {
  let playerBoardUI = createBoard(player.name);
  let playerContainer = createPlayerContainer(player, playerBoardUI);
  return playerContainer;
}

export function loadGame(playerOne, playerTwo) {
  let app = document.querySelector("#app");
  app.textContent = "";

  let playerOneContainer =
    createPlayerWrapperContainer(playerOne);
  let playerTwoContainer =
    createPlayerWrapperContainer(playerTwo);
  let game = new GameController(playerOne, playerTwo);

  let { gameInfo, gameContainer } = createGame(playerOne, playerTwo);

  gameContainer.appendChild(playerOneContainer);
  gameContainer.appendChild(playerTwoContainer);

  app.appendChild(gameInfo);
  app.appendChild(gameContainer);
}
