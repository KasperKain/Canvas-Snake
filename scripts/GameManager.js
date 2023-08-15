export default class GameManager {
  static isGameRunning = true;
  static score = 0;

  static reset() {
    GameManager.isGameRunning = true;
    GameManager.score = 0;
  }

  static gameOver() {
    GameManager.isGameRunning = false;
  }

  static incrementScore() {
    GameManager.score++;
    console.log("Score: " + GameManager.score);
  }
}
