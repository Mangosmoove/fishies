let gameStarted = false;

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    requestAnimationFrame(gameLoop);
}