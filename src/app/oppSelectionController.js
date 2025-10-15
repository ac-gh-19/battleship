import createOppSelectionModal from "../components/createOppModal";
import { loadFrontPage } from "./frontPageController";
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
    alert("To Be Added");
  });
  oppCpu.addEventListener("click", () => {
    modal.classList.toggle("show");
    alert("oppClicked");
    loadGame(playerName, "CPU");
  });
  exitBtn.addEventListener("click", () => {
    modal.classList.toggle("show");
    loadFrontPage(playerName);
  });
}
