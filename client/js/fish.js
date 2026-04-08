// fish rendering, wobble, collision
function drawFish(f) {
    ctx.save();
    ctx.globalAlpha = f.opacity;
    ctx.drawImage(f.img, f.x - f.w/2, f.y - f.h/2, f.w, f.h);
   
    // glow pulse
    const pulse = 0.5 + 0.5 * Math.sin(frameCount * 0.04 + f.phase);
    ctx.globalAlpha = f.opacity * 0.25 * pulse;
    ctx.filter = 'blur(8px)';
    ctx.drawImage(f.img, f.x - f.w/2 - 4, f.y - f.h/2 - 4, f.w + 8, f.h + 8);
    ctx.filter = 'none';
    ctx.restore();
}
   
function checkCollision(f, padding = 40) {
  return (
    dvd.x + padding         < f.x + f.w / 2 &&
    dvd.x + dvd.w - padding > f.x - f.w / 2 &&
    dvd.y + padding         < f.y + f.h / 2 &&
    dvd.y + dvd.h - padding > f.y - f.h / 2
  );
}

function updateFish(f) {
  f.x += f.vx;
  f.y += f.vy;

  // bounce off edges
  if (f.x - f.w / 2 < 0) { f.x = f.w / 2; f.vx *= -1; }
  if (f.x + f.w / 2 > W) { f.x = W - f.w / 2; f.vx *= -1; }
  if (f.y - f.h / 2 < 0) { f.y = f.h / 2; f.vy *= -1; }
  if (f.y + f.h / 2 > H) { f.y = H - f.h / 2; f.vy *= -1; }
}