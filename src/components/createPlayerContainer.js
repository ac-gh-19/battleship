export function createPlayerContainer(player, board) {
  let playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");

  let playerInfo = document.createElement("div");
  playerInfo.classList.add("player-info");

  let h2 = document.createElement("h2");
  h2.textContent = player.name;

  playerInfo.appendChild(h2);
  playerContainer.appendChild(playerInfo);
  playerContainer.appendChild(board);

  return playerContainer;
}
