import createPlayerInfo from "./createPlayerInfo";

export function createPlayerContainer(player, board) {
  let playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");

  playerContainer.appendChild(createPlayerInfo(player));
  playerContainer.appendChild(board);

  return playerContainer;
}
