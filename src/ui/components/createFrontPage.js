function createFrontPage(playBtnText) {
  let frontPage = document.createElement("div");
  frontPage.classList.add("pregame-card");

  let input = document.createElement("input");
  input.id = "nameInput";
  input.maxLength = 16;
  input.minLength = 3;
  input.placeholder = "Enter a Name";
  input.classList.add("input-name");
  input.id = "inputName";

  let playBtn = document.createElement("button");
  playBtn.classList.add("play-btn");
  playBtn.id = "playBtn";
  playBtn.textContent = playBtnText;

  frontPage.appendChild(input);
  frontPage.appendChild(playBtn);

  return { frontPage, playBtn, input };
}

export default createFrontPage;
