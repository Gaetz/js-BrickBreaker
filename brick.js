/**
 * Breakable Brick
 */
class Brick {

    constructor(x, y, width = BRICK_WIDTH, height = BRICK_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isAlive = true;
    }

    update(ball) {
        if (this.isAlive) {
            if (ball.x >= this.x && ball.x <= this.x + this.width
                && ball.y >= this.y && ball.y <= this.y + this.height) {
                ball.brickBounce(this);
                this.isAlive = false;
            }
        }
    }

    draw(canvasContext) {
        if (this.isAlive) {
            canvasContext.fillStyle = BRICK_STYLE;
            canvasContext.beginPath();
            canvasContext.rect(this.x, this.y, this.width - BRICK_GAP, this.height - BRICK_GAP);
            canvasContext.fill();
        }
    }

}