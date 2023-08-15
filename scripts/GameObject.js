import Settings from "./Settings.js";
import SpriteObject from "./SpriteObject.js";

// Base class that all Game Objects inherit
export default class GameObject {
  constructor(position, spriteSheet) {
    this.position = position;
    this.sprite = new SpriteObject(this.position, spriteSheet);
  }

  draw(ctx, debugColor) {
    this.sprite.draw(ctx, debugColor);
  }

  updateSpriteSheet(spriteSheet) {
    this.sprite.spriteSheet = spriteSheet;
  }

  update(position) {
    this.position.x += position.x;
    this.position.y += position.y;
  }
}
