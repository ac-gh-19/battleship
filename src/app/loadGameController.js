import GameController from "../logic/gameController";
import Player from "../logic/player";
import createBoard from "../components/createBoard";
import { setupShips } from "./placeShipsController";
import { createPlayerContainer } from "../components/createPlayerContainer";
import { createGame } from "../components/createGameContainer";

export function createPlayerAndContainer(playerName) {
  let player = new Player(playerName);
  let playerBoard = createBoard(playerName);
  let playerContainer = createPlayerContainer(player, playerBoard);
  return { player, playerContainer };
}

export function loadGame(playerOneName, playerTwoName) {
  let app = document.querySelector("#app");
  app.textContent = "";

  let { player: playerOne, playerContainer: playerOneContainer } =
    createPlayerAndContainer(playerOneName);
  let { player: playerTwo, playerContainer: playerTwoContainer } =
    createPlayerAndContainer(playerTwoName);
  let game = new GameController(playerOne, playerTwo);

  let { gameInfo, gameContainer } = createGame(playerOne, playerTwo);

  gameContainer.appendChild(playerOneContainer);
  gameContainer.appendChild(playerTwoContainer);

  app.appendChild(gameInfo);
  app.appendChild(gameContainer);

//   setupPlayerShips(playerOne);
    setupShips(playerOne);
    updateBoardUI(playerOne, playerOneContainer);
  setupShips(playerTwo);
  updateBoardUI(playerTwo, playerTwoContainer);
  
}

export function updateBoardUI(player, playerContainer) {
    for (let i = 0; i < player.gameboard.ships.length; ++i) {
        let shipPositions = player.gameboard.ships[i].positions;
        for (let [x,y] of shipPositions) {
            let cell = playerContainer.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            if (player.gameboard.board[y][x].ship != null) {
                cell.classList.add("ship");
            }
        }
    }
}
