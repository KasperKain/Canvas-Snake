export default class Controller {
  constructor() {
    this.lastPressed = "up";
    this.downListener = document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.lastPressed = "left";
      if (e.key === "ArrowRight") this.lastPressed = "right";
      if (e.key === "ArrowUp") this.lastPressed = "up";
      if (e.key === "ArrowDown") this.lastPressed = "down";
      if (e.code === "Space") this.lastPressed = "a";
    });
  }
}
