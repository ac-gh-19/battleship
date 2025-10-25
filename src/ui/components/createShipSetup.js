import createBoard from "./createBoard";

export function createShipSetup(player) {
  let setupContainer = document.createElement("div");
  setupContainer.classList.add("playerSetup");
  setupContainer.id = "playerSetup";

  let setupInfo = document.createElement("h2");
  setupInfo.id = "setupPlayerInfo";

  let shipsInfo = document.createElement("p");
  shipsInfo.id = "shipsInfo";

  let setupBoard = createBoard(player.name);

  let setupOptions = document.createElement("div");
  setupOptions.classList.add("playerSetupOptions");
  setupOptions.id = "playerSetupOptions";

  let btns = [
    { id: "rdmBtn", text: "Place Randomly" },
    { id: "dirBtn", text: "horizontal" },
    { id: "nextBtn", text: "Continue" },
    { id: "resetBtn", text: "Reset" },
  ];

  let createdBtns = {};

  btns.forEach(({ id, text }) => {
    const btn = document.createElement("button");
    btn.id = id;
    btn.textContent = text;
    setupOptions.append(btn);
    createdBtns[id] = btn;
  });

  setupContainer.append(setupInfo);
  setupContainer.append(shipsInfo);
  setupContainer.append(setupBoard);
  setupContainer.append(setupOptions);

  return { setupContainer, shipsInfo, setupInfo, createdBtns };
}
