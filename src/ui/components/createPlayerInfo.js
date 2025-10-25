function createPlayerInfo(player, numPlayer) {
  let playerInfoContainer = document.createElement("div");
  playerInfoContainer.classList.add("player-info");

  let h2 = document.createElement("h2");
  h2.textContent = player.name;

  let p = document.createElement("p");
  p.id = `${numPlayer}Player`;

  playerInfoContainer.appendChild(h2);
  playerInfoContainer.appendChild(p);

  return playerInfoContainer;
}

export default createPlayerInfo;
