import createOppModal from "./createOppModal.js";

function initApp() {
  document.addEventListener("DOMContentLoaded", () => {
    let frontPage = createFrontPage("ENTER THE WATERS");
    console.log(frontPage);
    document.querySelector("body").appendChild(frontPage);
  });
}
