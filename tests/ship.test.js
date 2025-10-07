import Ship from "../src/app/ship.js";

test("Initializes Ship", () => {
  expect(new Ship(3)).toEqual({
    length: 3,
    isSunk: false,
    health: 3,
  });

  expect(new Ship(5)).toEqual({
    length: 5,
    isSunk: false,
    health: 5,
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
    console.log(ship);
    expect(ship.isShipSunk()).toBe(false);
    ship.hit();
    expect(ship.isShipSunk()).toBe(true);
    ship.hit();
    expect(ship.isShipSunk()).toBe(true);
})