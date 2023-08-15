import Snake from "./Snake.js";
import Food from "./Food.js";
import Settings from "./Settings.js";
import SpriteCollection from "./SpriteCollection.js";
import AudioManager from "./AudioManager.js";
import GameManager from "./GameManager.js";
import ParticleGenerator from "./ParticleGenerator.js";

export default class GameScene {
  constructor(controller) {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.canvas.width = Settings.gameWidth;
    this.canvas.height = Settings.gameHeight;

    this.controller = controller;

    this.snake = new Snake(SpriteCollection.playerSprites1[0]);
    this.food = new Food({ x: 10, y: 10 }, SpriteCollection.foodSprites[0]);
    this.food.updatePosition();

    this.bgImage = new Image();
    this.bgImage.src = "./assets/backgrounds/BGMain.png";

    this.remainingGameTime = Settings.gameTime;
    this.remainingAnimationTime = Settings.animationTime;

    this.startDelay = 2000; // 2-second delay before starting
    this.startGame = false;

    this.particleGenerator = new ParticleGenerator();

    setTimeout(() => {
      this.startGame = true;
    }, this.startDelay);
    this.animate();
    AudioManager.playMusic("mainThemeAlt");
  }

  // Probably should have handled this in two seperate functions
  updatePlayerDirectionAndSprite() {
    this.playerDirection = this.snake.velocity;
    let spriteIndex = 0;
    switch (this.controller.lastPressed) {
      case "left":
        this.playerDirection = { x: -1, y: 0 };
        spriteIndex = 2;
        break;
      case "right":
        this.playerDirection = { x: 1, y: 0 };
        spriteIndex = 3;
        break;
      case "up":
        this.playerDirection = { x: 0, y: -1 };
        spriteIndex = 1;
        break;
      case "down":
        this.playerDirection = { x: 0, y: 1 };
        spriteIndex = 0;
        break;
    }
    this.snake.updateSpriteSheet(SpriteCollection.playerSprites1[spriteIndex]);
  }

  // WARNING:
  // A sloppy monolithic spiderweb of a function to handle the ENTIRE game loop + redrawing.
  // Dear god, what have I done?
  animate() {
    if (
      this.controller.lastPressed === "a" &&
      !GameManager.isGameRunning &&
      this.startGame
    ) {
      this.restartGame();
    }

    // Part of the loop that updates sprite animations and drawing
    //------------------------------------
    if (this.startGame) {
      if (this.remainingAnimationTime <= 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
        this.updatePlayerDirectionAndSprite();

        if (!Settings.debugMode) {
          this.ctx.drawImage(
            this.bgImage,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
        }
        this.snake.draw(this.ctx, this.playerDirection.x == 1);
        this.food.draw(this.ctx, "yellow");
        this.particleGenerator.updateAndDraw(this.ctx);

        //Renders the score on screen when the game is over.
        if (!GameManager.isGameRunning && this.startGame) {
          // Draw the score on the canvas
          this.ctx.fillStyle = "rgba(15, 56, 15, 1)";
          this.ctx.font = "20px 'Press Start 2P', cursive";
          this.ctx.textAlign = "center";
          this.ctx.fillText(
            "Score: " + GameManager.score,
            this.canvas.width / 2,
            this.canvas.height / 2
          );
          this.ctx.font = "14px 'Press Start 2P', cursive";
          this.ctx.fillText(
            "Press Spacebar",
            this.canvas.width / 2,
            this.canvas.height / 2 + 80
          );
        }

        if (Settings.debugMode) this.drawDebug();

        // film effect
        this.ctx.fillStyle = `rgba(255, 255, 255, ${Settings.sunGlare}`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.remainingAnimationTime = Settings.animationTime;
      } else {
        this.remainingAnimationTime -= 1;
      }

      // Part of the loop that runs the game
      //------------------------------------
      if (this.remainingGameTime <= 0) {
        this.snake.update(this.playerDirection);
        if (
          this.snake.head.position.x === this.food.position.x &&
          this.snake.head.position.y === this.food.position.y
        ) {
          AudioManager.play("foodGet");
          this.snake.grow();
          this.food.updatePosition();
        }
        this.remainingGameTime = Settings.gameTime;
      } else {
        this.remainingGameTime -= 1;
      }
    } else {
      //Dumb hack. Without this block of code, images and effects aren't rendered at the start of the game.
      //No time to figure out a solution, so this hack will do for now.
      if (!Settings.debugMode) {
        this.ctx.drawImage(
          this.bgImage,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
      }
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Settings.sunGlare}`;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      //End of hack
    }
    window.requestAnimationFrame(this.animate.bind(this));
  }

  restartGame() {
    // Reset all the game variables here
    this.snake = new Snake(SpriteCollection.playerSprites1[0]);
    this.food.updatePosition();
    this.remainingGameTime = Settings.gameTime;
    this.remainingAnimationTime = Settings.animationTime;
    this.startGame = false;

    // Add a delay before starting the game again
    setTimeout(() => {
      this.startGame = true;
    }, this.startDelay);

    // Gameova bruh
    GameManager.isGameRunning = true;
    GameManager.score = 0;
  }

  drawDebug() {
    const debugVel = `[${this.snake.velocity.x} ${this.snake.velocity.y}]  `;
    const debugPos = `[${this.snake.head.position.x} ${this.snake.head.position.y}] `;
    const debugFood = `[${this.food.position.x} ${this.food.position.y}]`;
    const segmentLength = `Length: [${this.snake.snakeBody.length - 1}]`;
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.font = "14px 'Press Start 2P', cursive";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`${debugPos}`, 20, this.canvas.height - 20);
    this.ctx.textAlign = "right";
    this.ctx.fillText(
      `${debugVel}`,
      this.canvas.width,
      this.canvas.height - 20
    );
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `${debugFood}`,
      this.canvas.width / 2,
      this.canvas.height - 20
    );

    this.ctx.textAlign = "center";
    this.ctx.fillText(`${segmentLength}`, this.canvas.width / 2, 20);
  }
}
