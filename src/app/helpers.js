export function updateBoardUI(player) {
  let boardUI = document.querySelector(`[data-board="${player.name}"]`);
  for (let i = 0; i < player.gameboard.ships.length; ++i) {
    let shipPositions = player.gameboard.ships[i].positions;
    for (let [x, y] of shipPositions) {
      let cell = boardUI.querySelector(
        `[data-x="${x}"][data-y="${y}"]`,
      );
      if (player.gameboard.board[y][x]) {
        cell.classList.add("ship");
      }
    }
  }
}

export function clearBoardUI(player) {
    let boardUI = document.querySelector(`[data-board="${player.name}"]`);
    for (let i = 0; i < player.gameboard.ships.length; ++i) {
    let shipPositions = player.gameboard.ships[i].positions;
    for (let [x, y] of shipPositions) {
      let cell = boardUI.querySelector(
        `[data-x="${x}"][data-y="${y}"]`,
      );
      if (player.gameboard.board[y][x]) {
        cell.classList.remove("ship");
        player.gameboard.board[y][x] = null;
      }
    }
  }
}
