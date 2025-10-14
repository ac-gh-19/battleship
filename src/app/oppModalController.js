import createOppSelectionModal from "../components/createOppModal";
import { loadFrontPage } from "./frontPageController";

export function loadOppSelection(name) {
    let modal = document.querySelector("#modal");
    
    // oppSelectionModal already exists from previous click
    // and we just need to toggle it's display and update name
    if (document.querySelector("#oppSelectionModal")) {
        modal.classList.toggle("show");
        document.querySelector("#oppModalTitle").textContent = `Choose Your Opponent ${name}`;
        return;
    };

  let oppSelectionModal = createOppSelectionModal(
    `Choose Your Opponent ${name}`,
  );
  modal.appendChild(oppSelectionModal);
  modal.classList.toggle("show");

  let oppPlayer = oppSelectionModal.querySelector("#oppPlayer");
  let oppCpu = oppSelectionModal.querySelector("#oppCpu");
  let exitBtn = oppSelectionModal.querySelector("#exitBtn");

  oppPlayer.addEventListener("click", () => {
    alert("To Be Added");
  });
  oppCpu.addEventListener("click", () => {
    alert("oppClicked");
  });
  exitBtn.addEventListener("click", () => {
    modal.classList.toggle("show");
    loadFrontPage(name)
  })
  
}
