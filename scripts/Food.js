import GameObject from "./GameObject.js";
import Settings from "./Settings.js";
import SpriteCollection from "./SpriteCollection.js";

export default class Food extends GameObject {
  constructor(position) {
    super(position, SpriteCollection.foodSprites[0]);
  }
  updatePosition() {
    // Hack for restarting the animation on respawn.
    // Should have handled this is the SpriteObject. Oh well
    this.updateSpriteSheet(SpriteCollection.foodSprites[1]);
    this.sprite.spriteIndex = 0;
    setTimeout(() => {
      this.position.x = Math.floor(Math.random() * Settings.tiles);
      this.position.y = Math.floor(Math.random() * Settings.tiles);
      this.spriteSheet = SpriteCollection.foodSprites[0];
      this.updateSpriteSheet(SpriteCollection.foodSprites[0]);
    }, 500);
  }
}
