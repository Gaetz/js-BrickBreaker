/**
 * Moving paddle, to send back the ball
 */
class Paddle {

  constructor(x, y, width = PADDLE_WIDTH, height = PADDLE_HEIGHT, speedX = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
  }

  update() {
      
  }

  draw(canvasContext) {
    canvasContext.fillStyle = PADDLE_STYLE;
    canvasContext.beginPath();
    canvasContext.rect(this.x, this.y, this.width, this.height);
    canvasContext.fill();
  }

  /**
   * Give the ball a horizontal speed based on pad collision's position
   * @param {int} ballY Ball Y position
   */
  getBounceHorizontalSpeed(ballX) {
    return Math.round(BALL_START_SPEED_X * (ballX - (this.x + this.width / 2)) / this.width * ANGLE_MULTIPLICATOR);
  }
}