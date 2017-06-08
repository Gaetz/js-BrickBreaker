/**
 * The ball the players have to catch
 */
class Ball {

    constructor(x, y = Math.round(Math.random() * 450 + 75), radius = BALL_RADIUS, speedX = BALL_START_SPEED_X, speedY = BALL_START_SPEED_Y) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update(canvas) {
        // Move
        this.x += this.speedX;
        this.y += this.speedY;
        // Wall bounce
        if (this.y < 0)
            this.speedY *= -1;
        if (this.x > canvas.width || this.x < 0)
            this.speedX *= -1;
    }

    draw(canvasContext) {
        canvasContext.fillStyle = BALL_STYLE;
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }


    /**
     * Called when a ball bounces on the paddle
     * @param {*} paddle - Paddle on which the ball bounces
     */
    bounce(paddle, canvas) {
        this.speedX = paddle.getBounceHorizontalSpeed(this.x);
        this.speedY *= -1;
        // Place ball in case it got out of screen because of speed
        if (this.y > canvas.height)
            this.y = paddle.y;
    }

    /**
     * Called when a ball bounces on a brick
     * @param {*} brick The brick the ball will bounce on
     */
    brickBounce(brick) {
        this.speedX *= -1;
        this.speedY *= -1;
    }

    /**
     * Reset ball position and speed
     */
    reset() {
        this.x = BALL_START_X;
        this.y = BALL_START_Y;
        this.speedX = BALL_START_SPEED_X;
        this.speedY = BALL_START_SPEED_Y;
    }
}