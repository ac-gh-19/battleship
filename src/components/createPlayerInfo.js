function createPlayerInfo(player) {
  let playerInfoContainer = document.createElement("div");
  playerInfoContainer.classList.add("player-info");

  let h2 = document.createElement("h2");
  h2.textContent = player.name;

  playerInfoContainer.appendChild(h2);

  return playerInfoContainer;
}

export default createPlayerInfo;
