const gameCanvas = document.getElementById('game-canvas');
const ctx = gameCanvas.getContext('2d');
let frameCount = 0;
let lastTime = null;

function setStatus(text, duration = 20) {
  statusText = text;
  statusTimer = duration;
}

function gameLoop(timestamp) {
  frameCount++;
  if (!lastTime) lastTime = timestamp;
  const delta = (timestamp - lastTime) / 16.67;
  lastTime = timestamp;

  ctx.clearRect(0, 0, W, H);
  updateDVD(delta);
  drawDVD();

  fish.forEach(f => {
    f.opacity = checkCollision(f) ? 0.35 : 1;
    drawFish(f);
  });

  // status timer tick
  if (statusTimer > 0) {
    statusTimer--;
  } else {
    statusText = 'TANK ACTIVE';
  }

  document.getElementById('status').textContent = statusText;

  requestAnimationFrame(gameLoop);
}