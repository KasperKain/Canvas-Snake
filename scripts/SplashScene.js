import AudioManager from "./AudioManager.js";
import Settings from "./Settings.js";

// Every time I come back to this script, I forget how half of it works.
// What a mess...
export default class SplashScene {
  constructor(callback) {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.textY = -20;
    this.alpha = 1;

    this.canvas.width = Settings.gameWidth;
    this.canvas.height = Settings.gameHeight;

    this.callback = callback;

    this.startTime = 0;
    this.dropDuration = 2000;
    this.waitDuration = 2000;
    this.imageDisplayDuration = 6000;
    this.fadeDuration = 2000;

    this.bgImage = new Image();
    this.bgImage.src = "assets/backgrounds/BGSplash.png";

    this.animate();
    this.hasPlayedSound = false;
    this.hasPlayedMusic = false;
  }

  animate(time = 0) {
    if (!this.startTime) this.startTime = time;

    const elapsed = time - this.startTime;
    const midY = this.canvas.height / 2;

    this.ctx.fillStyle = "#9bbc0f";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (elapsed < this.dropDuration) {
      this.textY = (elapsed / this.dropDuration) * midY;
    } else if (elapsed < this.dropDuration + this.waitDuration) {
      if (!this.hasPlayedSound) {
        AudioManager.play("GBStart");
        this.hasPlayedSound = true;
      }
      this.textY = midY;
    } else if (
      elapsed <
      this.dropDuration + this.waitDuration + this.imageDisplayDuration
    ) {
      this.ctx.drawImage(
        this.bgImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      if (!this.hasPlayedMusic) {
        AudioManager.playMusic("splashTheme", true);
        this.hasPlayedMusic = true;
      }
      this.ctx.fillStyle = "rgba(15, 56, 15, 1)";
      this.ctx.font = "30px 'Press Start 2P', cursive";
      this.ctx.textAlign = "left";
      this.ctx.fillText("Snake", 20, this.canvas.height / 2);
    } else if (
      elapsed <
      this.dropDuration +
        this.waitDuration +
        this.imageDisplayDuration +
        this.fadeDuration
    ) {
      const fadeAlpha =
        (elapsed -
          (this.dropDuration + this.waitDuration + this.imageDisplayDuration)) /
        this.fadeDuration;
      this.ctx.drawImage(
        this.bgImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.ctx.fillStyle = `rgba(9, 188, 15, ${fadeAlpha})`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.callback();
      return;
    }

    if (elapsed < this.dropDuration + this.waitDuration) {
      this.ctx.fillStyle = `rgba(15, 56, 15, ${this.alpha})`;
      this.ctx.font = "15px 'Press Start 2P', cursive";
      this.ctx.textAlign = "center";
      this.ctx.fillText("A Game By", this.canvas.width / 2, this.textY - 20);
      this.ctx.font = "20px 'Press Start 2P', cursive";
      this.ctx.fillText("KASPER KAIN", this.canvas.width / 2, this.textY + 20);
    }

    this.ctx.fillStyle = `rgba(255, 255, 255, ${Settings.sunGlare})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    window.requestAnimationFrame(this.animate.bind(this));
  }
}
