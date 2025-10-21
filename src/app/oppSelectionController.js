import createOppSelectionModal from "../components/createOppModal";
import Player from "../logic/player";
import { loadFrontPage } from "./frontPageController";
import { loadSetupPage } from "./setupPageController";
import { loadGame } from "./loadGameController";

export function loadOppSelection(playerName) {
  let oppSelectionModal = createOppSelectionModal(
    `Choose Your Opponent ${playerName}`,
  );

  let modal = document.querySelector("#modal");
  modal.textContent = "";
  modal.appendChild(oppSelectionModal);
  modal.classList.toggle("show");

  let oppPlayer = oppSelectionModal.querySelector("#oppPlayer");
  let oppCpu = oppSelectionModal.querySelector("#oppCpu");
  let exitBtn = oppSelectionModal.querySelector("#exitBtn");

  oppPlayer.addEventListener("click", () => {
    let p2 = new Player(prompt("Enter Opponents Name"));
    let p1 = new Player(playerName);
    modal.classList.toggle("show");
    loadSetupPage(p1, () => {
      loadSetupPage(p2, () => {
        loadGame(p1, p2);
      })
    });
  });
  oppCpu.addEventListener("click", () => {
    let p1 = new Player(playerName);
    let p2 = new Player();
    modal.classList.toggle("show");
    alert("oppClicked");
    loadSetupPage(p1, () => {
      loadSetupPage(p2, () => {
        loadGame(p1, p2);
      })
    });
  });
  exitBtn.addEventListener("click", () => {
    modal.classList.toggle("show");
    loadFrontPage(playerName);
  });
}
