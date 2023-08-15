import Settings from "./Settings.js";
import AudioManager from "./AudioManager.js";
import SnakeSegment from "./SnakeSegment.js";
import SpriteCollection from "./SpriteCollection.js";
import GameManager from "./GameManager.js";

export default class Snake {
  constructor(spriteSheet) {
    // Configuration
    this.velocity = { x: 0, y: 1 };
    this.isColliding = false;
    this.spriteSheet = spriteSheet;
    this.spriteIndex = 0;

    // Snake Body Initialization
    this.snakeBody = [
      new SnakeSegment({ x: 1, y: 1 }, spriteSheet),
      new SnakeSegment({ x: 12, y: 12 }, [SpriteCollection.playerSegment]),
      new SnakeSegment({ x: 12, y: 12 }, [SpriteCollection.playerSegment]),
    ];
    this.head = this.snakeBody[0];
  }

  draw(ctx) {
    this.snakeBody.forEach((segment) => {
      if (segment === this.head) {
        this.head.sprite.spriteIndex = this.spriteIndex;
      }
      segment.draw(ctx);
      if (this.spriteIndex < this.head.sprite.spriteIndex) {
        this.spriteIndex++;
      }
    });
  }

  updateSpriteSheet(spriteSheet) {
    this.head.updateSpriteSheet(spriteSheet);
  }

  // TODO: There's a bug here... Something causes the direction sound to loop occasionally.
  // There's not enough time to figure it out. Maybe I'll revisit this.
  update(direction) {
    this.spriteIndex = 0;
    // Early return conditions
    if (!GameManager.isGameRunning && !this.isColliding) return;
    if (
      GameManager.isGameRunning &&
      (direction.x !== this.velocity.x || direction.y !== this.velocity.y)
    ) {
      AudioManager.play("changeDirection");
    }
    if (this.isColliding) {
      this.animateCollision();
      return;
    }

    // Update velocity
    this.velocity.x =
      this.velocity.x != -direction.x ? direction.x : this.velocity.x;
    this.velocity.y =
      this.velocity.y != -direction.y ? direction.y : this.velocity.y;

    // Update body positions and handle collisions
    for (let i = this.snakeBody.length - 1; i >= 0; i--) {
      // Update head position
      if (i === 0) {
        this.snakeBody[i].position.x += this.velocity.x;
        this.snakeBody[i].position.y += this.velocity.y;
      } else {
        // Check for self collisions
        if (
          this.snakeBody[0].position.x == this.snakeBody[i].position.x &&
          this.snakeBody[0].position.y == this.snakeBody[i].position.y
        ) {
          this.handleCollision();
          return;
        }
        this.snakeBody[i].position.x = this.snakeBody[i - 1].position.x;
        this.snakeBody[i].position.y = this.snakeBody[i - 1].position.y;
      }
    }

    // Wall collision check
    if (
      this.head.position.x < 0 ||
      this.head.position.y < 0 ||
      this.head.position.x > Settings.tiles + 3 ||
      this.head.position.y > Settings.tiles + 3
    ) {
      this.handleCollision();
      return;
    }
  }

  grow() {
    this.snakeBody.push(
      new SnakeSegment({ x: 20, y: 20 }, [SpriteCollection.playerSegment])
    );
  }

  animateCollision() {
    if (this.snakeBody.length === 1) return;
    AudioManager.play("removeSegment");
    this.snakeBody.pop();
    GameManager.incrementScore();
  }

  handleCollision() {
    GameManager.isGameRunning = false;
    this.isColliding = true;
    this.head.visible = false;
    console.log("Crash, Boom, Bam!"); // I no longer need this, but it amuses me
  }
}
