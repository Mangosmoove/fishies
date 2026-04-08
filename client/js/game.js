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

  fish = fish.filter(f => {
    updateFish(f);
    if (checkCollision(f)) {
      setStatus('COLLISION');
      userFishCount[f.owner]--;
      document.getElementById('fish-count').textContent = `FISH: ${fish.length - 1}`;
      return false;
    }
    drawFish(f);
    return true;
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