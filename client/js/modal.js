// drawing modal open/close
const drawCanvas = document.getElementById('draw-canvas');
const dctx = drawCanvas.getContext('2d');
let drawing = false;
let currentColor = '#00ffe0';
let currentSize = 5;

function openModal() {
    document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
}

function clearDrawing() {
    dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
}

function addFishToTank() {
    const img = new Image();
    img.src = drawCanvas.toDataURL();
    img.onload = () => {
      const scale = 0.35 + Math.random() * 0.3;
      fish.push({
        img,
        x: 80 + Math.random() * (W - 160),
        y: 80 + Math.random() * (H - 160),
        w: drawCanvas.width * scale,
        h: drawCanvas.height * scale,
        phase: Math.random() * Math.PI * 2,
        opacity: 1,
        wobble: 0
      });
      document.getElementById('fish-count').textContent = `FISH: ${fish.length}`;
      closeModal();
    };
}