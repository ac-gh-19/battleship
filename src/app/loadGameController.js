import GameController from "../logic/gameController";
import Player from "../logic/player";
import createBoard from "../components/createBoard";
import { createPlayerContainer } from "../components/createPlayerContainer";
import { createGame } from "../components/createGameContainer";

export function loadGame(playerOneName, playerTwoName) {
  let app = document.querySelector("#app");
  app.textContent = "";

  let playerOne = new Player(playerOneName);
  let playerTwo = new Player(playerTwoName);
  let game = new GameController(playerOne, playerTwo);

  let { gameInfo, gameContainer } = createGame(playerOne, playerTwo);
  gameInfo.textContent = `${game.currentPlayer.name}'s Turn`;

  let playerOneBoard = createBoard((x, y) => {
    console.log("Player Ones");
    console.log(x, y);
  });
  let playerOneContainer = createPlayerContainer(playerOne, playerOneBoard);

  let playerTwoBoard = createBoard((x, y) => {
    console.log("Player Twos");
    console.log(x, y);
  });
  let playerTwoContainer = createPlayerContainer(playerTwo, playerTwoBoard);

  gameContainer.appendChild(playerOneContainer);
  gameContainer.appendChild(playerTwoContainer);

  app.appendChild(gameInfo);
  app.appendChild(gameContainer);
}
