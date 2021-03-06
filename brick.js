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

    update() {

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