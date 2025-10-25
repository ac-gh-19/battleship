export function createGame() {
  let gameInfo = document.createElement("div");
  gameInfo.classList.add("game-info");

  let gameContainer = document.createElement("div");
  gameContainer.classList.add("game");

  return { gameInfo, gameContainer };
}
