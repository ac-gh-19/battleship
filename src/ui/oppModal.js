import playerIMG from "../assets/player.svg";
import computerIMG from "../assets/computer.svg";
import exitBtnIMG from "../assets/closeBtn.svg";

function initChooseOppModal(title, p1, p2) {
  function createOppCard(name, imgSRC) {
    let opponent = document.createElement("div");
    opponent.classList.add("opponent");

    let playerH2 = document.createElement("h2");
    playerH2.classList.add("opponent-header");
    playerH2.textContent = name;
    let playerIMG = document.createElement("img");
    playerIMG.src = imgSRC;
    playerIMG.classList.add("player-option");

    opponent.appendChild(playerH2);
    opponent.appendChild(playerIMG);

    return opponent;
  }
  let container = document.createElement("div");
  container.classList.add("modal-container");

  let header = document.createElement("header");
  let h1 = document.createElement("h1");
  h1.textContent = title;
  h1.classList.add("header");
  header.appendChild(h1);

  let oppContainer = document.createElement("div");
  oppContainer.classList.add("opponents-container");

  let opp1 = createOppCard(p1, playerIMG);
  let opp2 = createOppCard(p2, computerIMG);
  oppContainer.appendChild(opp1);
  oppContainer.appendChild(opp2);

  let exitBtn = document.createElement("img");
  exitBtn.src = exitBtnIMG;
  exitBtn.classList.add("exit-button");

  container.appendChild(header);
  container.appendChild(oppContainer);
  container.appendChild(exitBtn);

  console.log(container);
  return container;
}

export default initChooseOppModal;
