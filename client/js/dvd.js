// DVD logo logic (position, bounce, color)
let dvdSvgText = '';
let dvdImage = new Image();       // cached, reused every frame
let dvdImageReady = false;        // only draw once loaded

fetch('assets/dvd-logo.svg')
    .then(res => res.text())
    .then(svgText => {
        dvdSvgText = svgText;
        rebuildDvdImage(true);        // build initial image before starting
    });

let pendingImg = null;  // track in-flight image

function rebuildDvdImage(isInitial = false) {
    if (!dvdSvgText) return;

    // cancel any pending load
    if (pendingImg) {
        pendingImg.onload = null;
        pendingImg = null;
    }

    const colored = dvdSvgText.replace(/fill:[^;"]*/g, `fill:${dvd.color}`);
    const blob = new Blob([colored], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const newImg = new Image();
    pendingImg = newImg;

    newImg.onload = () => {
        if (newImg !== pendingImg) return;  // stale, discard
        dvdImage = newImg;
        dvdImageReady = true;
        pendingImg = null;
        URL.revokeObjectURL(url);
        if (isInitial) startGame();
    };
    newImg.src = url;
}

function drawDVD() {
    if (!dvdImageReady) return;
    ctx.drawImage(dvdImage, dvd.x, dvd.y, dvd.w, dvd.h);
}

function updateDVD(delta = 1) {
    dvd.x += dvd.vx * delta;
    dvd.y += dvd.vy * delta;

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
        let newIdx;
        do {
            newIdx = Math.floor(Math.random() * DVD_COLORS.length);
        } while (DVD_COLORS[newIdx] === dvd.color);
        dvd.color = DVD_COLORS[newIdx];
        rebuildDvdImage();
    }
}