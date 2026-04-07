// freehand drawing logic
function setColor(el) {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    currentColor = el.dataset.color;
}

document.getElementById('brush-size').addEventListener('input', e => {
    currentSize = parseInt(e.target.value);
});

function getPos(e) {
    const r = drawCanvas.getBoundingClientRect();
    const scaleX = drawCanvas.width / r.width;
    const scaleY = drawCanvas.height / r.height;
    const cx = (e.clientX ?? e.touches?.[0]?.clientX) - r.left;
    const cy = (e.clientY ?? e.touches?.[0]?.clientY) - r.top;
    return { x: cx * scaleX, y: cy * scaleY };
}
   
drawCanvas.addEventListener('mousedown', e => { drawing = true; const p = getPos(e); dctx.beginPath(); dctx.moveTo(p.x, p.y); });
drawCanvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const p = getPos(e);
    dctx.lineTo(p.x, p.y);
    dctx.strokeStyle = currentColor;
    dctx.lineWidth = currentSize;
    dctx.lineCap = 'round';
    dctx.lineJoin = 'round';
    dctx.shadowColor = currentColor;
    dctx.shadowBlur = currentSize * 1.2;
    dctx.stroke();
    dctx.beginPath();
    dctx.moveTo(p.x, p.y);
});
drawCanvas.addEventListener('mouseup', () => { drawing = false; });
drawCanvas.addEventListener('mouseleave', () => { drawing = false; });