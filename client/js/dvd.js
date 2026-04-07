// DVD logo logic (position, bounce, color)
let dvdSvgText = '';

fetch('assets/dvd-logo.svg')
    .then(res => res.text())
    .then(svgText => {
        dvdSvgText = svgText;
        startGame();
    });

function drawDVD() {
    if (!dvdSvgText) return;

    const colored = dvdSvgText.replace(/fill="[^"]*"/g, `fill="${dvd.color}"`);
    const blob = new Blob([colored], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, dvd.x, dvd.y, dvd.w, dvd.h);
        URL.revokeObjectURL(url);
    };
    img.src = url;
}

function updateDVD() {
    dvd.x += dvd.vx;
    dvd.y += dvd.vy;

    let bounced = false;

    if (dvd.x <= 0 || dvd.x + dvd.w >= W) {
        dvd.vx *= -1;
        dvd.x = Math.max(0, Math.min(dvd.x, W - dvd.w));
        bounced = true;
    }
    if (dvd.y <= 0 || dvd.y + dvd.h >= H) {
        dvd.vy *= -1;
        dvd.y = Math.max(0, Math.min(dvd.y, H - dvd.h));
        bounced = true;
    }

    if (bounced) {
        const idx = Math.floor(Math.random() * DVD_COLORS.length);
        dvd.color = DVD_COLORS[idx];
    }
}