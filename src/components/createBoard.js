function createBoard(playerName) {
  let boardWrapper = document.createElement("div");
  boardWrapper.classList.add("board-wrapper");

  let sideCords = document.createElement("div");
  sideCords.classList.add("side-cords");
  for (let i = 9; i >= 0; --i) {
    let cord = document.createElement("div");
    cord.classList.add("cord");
    cord.textContent = i;
    sideCords.appendChild(cord);
  }

  let bottomCords = document.createElement("div");
  bottomCords.classList.add("bottom-cords");
  for (let i = 0; i <= 9; ++i) {
    let cord = document.createElement("div");
    cord.classList.add("cord");
    cord.textContent = String.fromCharCode(65 + i);
    bottomCords.appendChild(cord);
  }

  let cornerCord = document.createElement("div");
  cornerCord.classList.add("corner-cord");

  let board = document.createElement("div");
  board.classList.add("board");
  board.dataset.board = playerName;
  for (let y = 0; y < 10; ++y) {
    for (let x = 0; x < 10; ++x) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      board.appendChild(cell);
    }
  }
  console.log(board);

  boardWrapper.appendChild(sideCords);
  boardWrapper.appendChild(board);
  boardWrapper.appendChild(cornerCord);
  boardWrapper.appendChild(bottomCords);

  return boardWrapper;
}

export default createBoard;
