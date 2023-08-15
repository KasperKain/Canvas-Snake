import Settings from "./Settings.js";

export default class SpriteObject {
  constructor(position, spriteSheet) {
    this.position = position;
    this.spriteSheet = spriteSheet;
    this.spriteIndex = 0;
    this.sprite = new Image("");
  }

  draw(ctx, debugColor) {
    const margin = 1; // Hack
    const tileWidth = Settings.gameWidth / (Settings.tiles * 2);
    const tileHeight = Settings.gameHeight / (Settings.tiles * 2);
    const scaledWidth = tileWidth * Settings.spriteScale;
    const scaledHeight = tileHeight * Settings.spriteScale;
    const x =
      tileWidth * this.position.x +
      tileWidth * margin -
      (scaledWidth - tileWidth) / 2;
    const y =
      tileHeight * this.position.y +
      tileHeight * margin -
      (scaledHeight - tileHeight) / 2;

    ctx.fillStyle = debugColor || "red";

    if (this.spriteSheet && !Settings.debugMode)
      ctx.drawImage(this.sprite, x, y, scaledWidth, scaledHeight);
    else ctx.fillRect(x, y, scaledWidth - 12, scaledHeight - 12);

    if (this.spriteSheet && this.spriteSheet[0].length > 1) {
      this.changeSprite();
    }
  }

  changeSprite() {
    if (this.spriteIndex >= this.spriteSheet.length - 1) this.spriteIndex = 0;
    else this.spriteIndex++;
    this.sprite.src = this.spriteSheet[this.spriteIndex];
  }
}
