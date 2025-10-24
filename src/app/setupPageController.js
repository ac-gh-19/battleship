import Ship from "../logic/ship";
import { updateBoardUI } from "./helpers";
import { clearBoard } from "./helpers";
import { renderSetupShips, updateSetupInfo } from "../ui/shipSetupUI";

export function loadSetupPage(p, callback) {
  let ships = [5, 4, 3, 3, 2, 2];

  if (p.type == "Computer") {
    p.gameboard.randomlyPlaceShips(ships);
    callback();
    return;
  }

  let { shipsInfo, btns } = renderSetupShips(p);
  updateSetupInfo(shipsInfo, ships);

  let rdmBtn = btns.rdmBtn;
  let dirBtn = btns.dirBtn;
  let resetBtn = btns.resetBtn;
  let nextBtn = btns.nextBtn;

  // Random placement
  rdmBtn.addEventListener("click", () => {
    clearBoard(p);
    ships = [5, 4, 3, 3, 2, 2];
    p.gameboard.randomlyPlaceShips(ships);
    console.log(p.gameboard);
    ships = [];
    updateBoardUI(p, true);
    updateSetupInfo(shipsInfo, ships);
  });

  dirBtn.addEventListener("click", () => {
    dirBtn.textContent =
      dirBtn.textContent == "horizontal" ? "vertical" : "horizontal";
  });

  resetBtn.addEventListener("click", () => {
    clearBoard(p);
    ships = [5, 4, 3, 3, 2, 2];
    updateSetupInfo(shipsInfo, ships);
  });

  nextBtn.addEventListener("click", () => {
    if (ships.length != 0) {
      alert("You must place all ships down");
    } else {
      callback(p);
    }
  });

  let board = document.querySelector(`[data-board="${p.name}"]`);
  let cells = board.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      handleCellClick(cell, p, ships, dirBtn);
      updateSetupInfo(shipsInfo, ships);
    });

    cell.addEventListener("mouseover", () => {
      handleCellHover(cell, p, ships, dirBtn);
    });

    cell.addEventListener("mouseleave", () => {
      handleCellHover(cell, p, ships, dirBtn);
    });
  });
}

function handleCellHover(cell, player, ships, dirBtn) {
  if (ships.length == 0) return;
  let gameboard = player.gameboard;

  // Gets the length of our next ship we're placing
  let length = ships[ships.length - 1];
  let direction = dirBtn.textContent;
  let [x, y] = [Number(cell.dataset.x), Number(cell.dataset.y)];

  if (
    !gameboard.isOutOfBounds([x, y], length, direction) &&
    !gameboard.isOverlappingShip([x, y], length, direction)
  ) {
    for (let i = 0; i < length; ++i) {
      let xi = x;
      let yi = y;
      xi = direction == "horizontal" ? xi + i : xi;
      yi = direction == "vertical" ? yi + i : yi;
      let highlightCell = document.querySelector(
        `[data-x="${xi}"][data-y="${yi}"]`,
      );
      highlightCell.classList.toggle("valid");
    }
  }
}

function handleCellClick(cell, player, ships, dirBtn) {
  if (ships.length == 0) {
    alert("Press Continue");
  } else {
    if (
      player.gameboard.placeShip(
        new Ship(ships[ships.length - 1]),
        [Number(cell.dataset.x), Number(cell.dataset.y)],
        dirBtn.textContent,
      )
    ) {
      updateBoardUI(player, true);
      ships.pop();
    }
  }
}
