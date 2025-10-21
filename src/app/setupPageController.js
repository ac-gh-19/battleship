import createBoard from "../components/createBoard";
import Ship from "../logic/ship";
import { updateBoardUI } from "./helpers";
import { clearBoardUI } from "./helpers";

export function loadSetupPage(p, callback) {
  let ships = [5,4,3,3,2];

  if (p.type == "Computer") {
    p.gameboard.randomlyPlaceShips(ships);
    callback();
    return;
  }

  let app = document.querySelector("#app");
  app.textContent = "";

  let {
    setupContainer: setup,
    setupInfo: info,
    createdBtns: btns,
  } = createSetupPage(p);
  app.append(setup);

  info.textContent = `Place Your Ships ${p.name}`;

  let rdmBtn = btns.rdmBtn;
  rdmBtn.addEventListener("click", () => {
    clearBoardUI(p);
    ships = [5, 4, 3, 3, 2, 2];
    p.gameboard.randomlyPlaceShips(ships);
    ships = [];
    updateBoardUI(p);
  });

  let dirBtn = btns.dirBtn;
  dirBtn.addEventListener("click", () => {
    dirBtn.textContent =
      dirBtn.textContent == "horizontal" ? "vertical" : "horizontal";
  });

  let resetBtn = btns.resetBtn;
  resetBtn.addEventListener("click", () => {
    clearBoardUI(p);
    ships = [5, 4, 3, 3, 2, 2];
  })

  let nextBtn = btns.nextBtn; 
  nextBtn.addEventListener("click", () => {
    if (ships.length != 0) {
        alert("You must place all ships down");
    } else {
        callback(p);
    }
  })

  let board = document.querySelector(`[data-board="${p.name}"]`)
  let cells = board.querySelectorAll(".cell");
  cells.forEach(function(cell) {
    cell.addEventListener("click", () => {
        if (ships.length == 0) {
            alert("Press Continue");
        } else {
            if (p.gameboard.placeShip(new Ship(ships.pop()), [Number(cell.dataset.x), Number(cell.dataset.y)], dirBtn.textContent)) {
                updateBoardUI(p);
            };
        }
        })
  })
}

export function createSetupPage(player) {
  let setupContainer = document.createElement("div");
  setupContainer.classList.add("playerSetup");
  setupContainer.id = "playerSetup";

  let setupInfo = document.createElement("h2");
  setupInfo.id = "setupPlayerInfo";

  let setupBoard = createBoard(player.name);

  let setupOptions = document.createElement("div");
  setupOptions.classList.add("playerSetupOptions");
  setupOptions.id = "playerSetupOptions";

  let btns = [
    { id: "rdmBtn", text: "Place Randomly" },
    { id: "dirBtn", text: "horizontal" },
    { id: "nextBtn", text: "Continue" },
    { id: "resetBtn", text: "Reset" }
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
  setupContainer.append(setupBoard);
  setupContainer.append(setupOptions);

  return { setupContainer, setupInfo, createdBtns };
}