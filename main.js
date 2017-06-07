let canvas, canvasContext;
let background;

/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Manage inputs
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
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
}

/**
 * Update loop
 */
function update() {

}

/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
}
