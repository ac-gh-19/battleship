function createCell(ship = null) {
  return {
    state: cellStates.EMPTY,
    ship: ship,
    isAttacked: false,
  };
}

const cellStates = {
  EMPTY: "empty",
  MISS: "miss",
  SHIP: "ship",
  HIT: "hit",
};

export { cellStates, createCell };
