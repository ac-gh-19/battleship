import createPlayerInfo from "./createPlayerInfo";

export function createPlayerContainer(player, board, numPlayer) {
  let playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");

  playerContainer.appendChild(createPlayerInfo(player, numPlayer));
  playerContainer.appendChild(board);

  return playerContainer;
}
