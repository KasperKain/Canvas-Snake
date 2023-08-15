export default class ButtonDisplayHandler {
  constructor() {
    this.dPadLeft = document.querySelector(".left-d-pad");
    this.dPadRight = document.querySelector(".right-d-pad");
    this.dPadUp = document.querySelector(".up-d-pad");
    this.dPadDown = document.querySelector(".down-d-pad");
    this.aButton = document.querySelector(".a-button");
    this.initializeListeners();
  }

  initializeListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.updateColor("left", "gray");
      if (e.key === "ArrowRight") this.updateColor("right", "gray");
      if (e.key === "ArrowUp") this.updateColor("up", "gray");
      if (e.key === "ArrowDown") this.updateColor("down", "gray");
      if (e.key === " ") this.updateColor("a", "gray");
    });

    window.addEventListener("keyup", (e) => {
      const color = "rgb(37, 37, 37)";
      if (e.key === "ArrowLeft") this.updateColor("left", color);
      if (e.key === "ArrowRight") this.updateColor("right", color);
      if (e.key === "ArrowUp") this.updateColor("up", color);
      if (e.key === "ArrowDown") this.updateColor("down", color);
      if (e.key === " ") this.updateColor("a", color);
    });
  }

  updateColor(button, color) {
    if (button === "left") this.dPadLeft.style.backgroundColor = color;
    if (button === "right") this.dPadRight.style.backgroundColor = color;
    if (button === "up") this.dPadUp.style.backgroundColor = color;
    if (button === "down") this.dPadDown.style.backgroundColor = color;
    if (button === "a") this.aButton.style.backgroundColor = color;
  }
}
