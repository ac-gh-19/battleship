export function updateBoardUI(player, setupPhase = false) {
  let boardUI = document.querySelector(`[data-board="${player.name}"]`);
  if (setupPhase) {
    for (let i = 0; i < player.gameboard.ships.length; ++i) {
      let shipPositions = player.gameboard.ships[i].positions;
      for (let [x, y] of shipPositions) {
        let cell = boardUI.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (player.gameboard.board[y][x]) {
          cell.classList.add("ship");
        }
      }
    }
    return;
  }

  let missedPositions = player.gameboard.missedCells;
  let hitPositions = player.gameboard.hitCells;
  for (let [x, y] of missedPositions) {
    let cell = boardUI.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    cell.classList.add("miss");
  }
  for (let [x, y] of hitPositions) {
    let cell = boardUI.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    cell.classList.add("hit");
  }
}

export function clearBoard(player) {
  let boardUI = document.querySelector(`[data-board="${player.name}"]`);
  for (let i = 0; i < player.gameboard.ships.length; ++i) {
    let shipPositions = player.gameboard.ships[i].positions;
    for (let [x, y] of shipPositions) {
      let cell = boardUI.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (player.gameboard.board[y][x]) {
        cell.classList.remove("ship");
        cell.classList.remove("valid");
        cell.classList.remove("invalid");
        player.gameboard.board[y][x] = null;
      }
    }
  }
  player.gameboard.ships = [];
}
