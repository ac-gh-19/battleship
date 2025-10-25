import createOppSelectionModal from "../ui/components/createOppModal";
import Player from "../logic/player";
import { loadFrontPage } from "./frontPageController";
import { loadSetupPage } from "./setupShipsController";
import { loadGame } from "./gameController";
import "../styles/oppModal.css";

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
    let p2Name = prompt("Enter Opponents Name");
    if (p2Name == null || p2Name.trim().length === 0) {
      alert("You must enter a name");
    } else if (p2Name == playerName) {
      alert("You cannot have the same name");
    } else if (p2Name.trim().length < 3) {
      alert("Your name is too short");
    } else if (p2Name.value === "CPU") {
      alert("That name is forbidden");
    } else {
      let p1 = new Player(playerName);
      let p2 = new Player(p2Name);
      modal.classList.toggle("show");
      loadSetupPage(p1, () => {
        loadSetupPage(p2, () => {
          loadGame(p1, p2);
        });
      });
    }
  });
  oppCpu.addEventListener("click", () => {
    let p1 = new Player(playerName);
    let p2 = new Player();
    modal.classList.toggle("show");
    alert("oppClicked");
    loadSetupPage(p1, () => {
      loadSetupPage(p2, () => {
        loadGame(p1, p2);
      });
    });
  });
  exitBtn.addEventListener("click", () => {
    modal.classList.toggle("show");
    loadFrontPage(playerName);
  });
}
