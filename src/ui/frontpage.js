function initFrontPage(btnText) {
  let div = document.createElement("div");
  div.classList.add("pregame-card");

  let input = document.createElement("input");
  input.id = "nameInput";
  input.maxLength = "16";
  input.placeholder = "Andrew";
  input.classList.add("input-name");

  let btn = document.createElement("button");
  btn.classList.add("play-btn");
  btn.textContent = btnText;

  div.appendChild(input);
  div.appendChild(btn);

  return div;
}

export default initFrontPage;
