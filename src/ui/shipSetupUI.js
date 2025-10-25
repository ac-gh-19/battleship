import { createShipSetup } from "./components/createShipSetup";

export function renderSetupShips(player) {
  let app = document.querySelector("#app");
  app.textContent = "";

  let {
    setupContainer: setup,
    shipsInfo,
    setupInfo: info,
    createdBtns: btns,
  } = createShipSetup(player);

  app.append(setup);
  info.textContent = `Place Your Ships ${player.name}!`;
  return {
    shipsInfo,
    btns,
  };
}

export function updateSetupInfo(shipsInfo, ships) {
  if (ships.length == 0) {
    shipsInfo.textContent = "Press Continue To Move On";
  } else {
    shipsInfo.textContent = `${ships.length} Ships Left to Place`;
  }
}
