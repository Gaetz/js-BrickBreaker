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
    for (let i = 0; i < BRICK_COLS; i++) {
        for (let j = 0; j < BRICK_ROWS; j++) {
            bricks.push(new Brick(i * BRICK_WIDTH, j * BRICK_HEIGHT))
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
    // Brick logic
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].update(ball);
    }
    // Paddle AI
    paddle.update(ball);
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
