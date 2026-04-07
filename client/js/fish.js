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
    ctx.restore();
}
   
function checkCollision(f) {
    return (
      dvd.x < f.x + f.w/2 &&
      dvd.x + dvd.w > f.x - f.w/2 &&
      dvd.y < f.y + f.h/2 &&
      dvd.y + dvd.h > f.y - f.h/2
    );
}