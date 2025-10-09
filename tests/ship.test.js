import Ship from "../src/app/ship.js";

test("Initializes Ship", () => {
  expect(new Ship(3)).toEqual({
    length: 3,
    health: 3,
    positions: []
  });

  expect(new Ship(5)).toEqual({
    length: 5,
    health: 5,
    positions: []
  });
});

test("Hitting Ship", () => {
  let ship = new Ship(3);
  ship.hit();
  expect(ship.health).toBe(2);
  ship.hit();
  expect(ship.health).toBe(1);
  ship.hit();
  expect(ship.health).toBe(0);
  ship.hit();
  expect(ship.health).toBe(0);
});

test("Sinking Ship", () => {
  let ship = new Ship(1);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
