let canvas, canvasContext;
let ball, paddle, bricks, background;

/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Manage inputs
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        paddle.x = mousePos.x - paddle.width / 2;
    });
    // Loop
    setInterval(() => {
        update();
        draw();
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Get mouse position on screen
 * @param {event} evt - Passing mouse move
 */
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

/**
 * Loading game elements 
 * */
function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
    background = new Background(canvas.width, canvas.height);
    ball = new Ball(BALL_START_X, BALL_START_Y);
    paddle = new Paddle(PADDLE_PLAYER_START_X, PADDLE_PLAYER_START_Y);
    bricks = [];
    loadBricks();
}

function loadBricks() {
    for (let i = 0; i < BRICK_ROWS; i++) {
        for (let j = 0; j < BRICK_COLS; j++) {
            bricks.push(new Brick(j * BRICK_WIDTH, i * BRICK_HEIGHT))
        }
    }
}

/**
 * Update loop
 */
function update() {
    ball.update(canvas);
    if (ball.speedY > 0) {  // Save us from a bug
        // Bottom out of terrain
        if (ball.y >= PADDLE_PLAYER_START_Y && ball.y <= PADDLE_PLAYER_START_Y + paddle.height) {
            // Ball on pad
            if (ball.x >= paddle.x - ball.radius / 2 && ball.x <= paddle.x + paddle.width + ball.radius / 2) {
                ball.bounce(paddle, canvas);
            }
        }
        // Lose condition
        if (ball.y > canvas.height) {
            // Reset ball
            ball.reset();
        }
    }
    // Ball bouncing on brick
    updateBallCollision();
    // Paddle AI
    paddle.update(ball);
}

function updateBallCollision() {
    let brickRow = Math.floor(ball.y / BRICK_HEIGHT);
    let brickCol = Math.floor(ball.x / BRICK_WIDTH);
    // Brick col and row must be in config limit
    if (brickCol < 0 || brickRow < 0 || brickRow >= BRICK_ROWS || brickCol >= BRICK_COLS)
        return;
    // Collision
    let collidedBrick = getBrickFromColAndRow(brickRow, brickCol);
    if (collidedBrick.isAlive) {
        collidedBrick.isAlive = false;
        ball.brickBounce(brickRow, brickCol);
    }
}

function getBrickFromColAndRow(brickRow, brickCol) {
    return bricks[brickCol + brickRow * BRICK_COLS];
}

/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
    paddle.draw(canvasContext);
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].draw(canvasContext);
    }
    ball.draw(canvasContext);
}
