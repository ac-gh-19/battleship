import Ship from "../logic/ship";

export function setupShips(player) {
  let shipsLeftToPlace = [5, 4, 3, 2, 2, 1];
  let board = player.gameboard;

  if (player.type === "Computer") {
    for (let length of shipsLeftToPlace) {
      let placed = false;
      while (!placed) {
        let { x, y, direction } = player.getRandMove();
        if (board.placeShip(new Ship(length), [x, y], direction)) {
          placed = true;
        }
      }
    }
  } else {
    return;
  }
}
