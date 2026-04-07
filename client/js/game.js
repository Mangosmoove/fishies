// game loop, canvas setup
const gameCanvas = document.getElementById('game-canvas');
const ctx = gameCanvas.getContext('2d');
let frameCount = 0;

function gameLoop() {
    frameCount++;
    ctx.clearRect(0, 0, W, H);
    
    updateDVD();
    drawDVD();

    fish.forEach(f => {
        f.opacity = checkCollision(f) ? 0.35 : 1;
        drawFish(f);
    });

    requestAnimationFrame(gameLoop);
}