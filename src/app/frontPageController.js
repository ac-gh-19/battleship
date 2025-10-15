import createFrontPage from "../components/createFrontPage";
import { loadOppSelection } from "./oppSelectionController";

export function loadFrontPage(inputName = "") {
  let frontPage = createFrontPage("ENTER THE WATERS");
  let app = document.querySelector("#app");
  app.textContent = "";
  app.appendChild(frontPage);

  let playBtn = frontPage.querySelector("#playBtn");
  let name = frontPage.querySelector("#inputName");
  name.value = inputName;
  console.log(name);

  playBtn.addEventListener("click", () => {
    if (name.value.trim().length === 0) {
      alert("You must enter a name");
    } else if (name.value.trim().length < 3) {
      alert("Your name is too short");
    } else if (name.value === "CPU") {
      alert("That name is forbidden");
    } else {
      playBtn.disabled = true;
      loadOppSelection(name.value.trim());
    }
  });
}
