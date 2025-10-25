import createFrontPage from "../ui/components/createFrontPage";
import { loadOppSelection } from "./oppSelectionController";
import "../styles/pregameCard.css";

export function loadFrontPage(inputName = "") {
  let { frontPage, playBtn, input } = createFrontPage("ENTER THE WATERS");
  let app = document.querySelector("#app");
  app.textContent = "";
  app.append(frontPage);

  input.value = inputName;

  playBtn.addEventListener("click", () => {
    if (input.value.trim().length === 0) {
      alert("You must enter a name");
    } else if (input.value.trim().length < 3) {
      alert("Your name is too short");
    } else if (input.value === "CPU") {
      alert("That name is forbidden");
    } else {
      playBtn.disabled = true;
      loadOppSelection(input.value.trim());
    }
  });
}
